import { execP } from '../util/exec-p';
import { fixedColumnWidthHeaders, fixedColumnWidthParser } from '../util/fixed-columns';

export interface DockerContainer {
   containerId: string;
   image: string;
   command: string;
   created: string;
   status: string;
   ports: string;
   names: string;
}

export interface DockerContainerDetail {
   all: DockerContainer[],
   running: DockerContainer[],
   exists: (selector: string) => boolean;
   isRunning: (selector: string) => boolean;
}

async function run(all: boolean): Promise<DockerContainerDetail> {
   const args = ['ps'];
   if (all) {
      args.push('-a');
   }

   const data = await execP('docker', ...args);
   const lines = data.split('\n');
   const head = fixedColumnWidthHeaders(lines.shift() || '');
   const containers: DockerContainerDetail = {
      all: [],
      running: [],

      exists (selector) {
         return !!containers.all.find(container => container.names === selector || container.containerId === selector);
      },

      isRunning (selector) {
         return !!containers.running.find(container => container.names === selector || container.containerId === selector);
      }
   };

   while (lines.length) {
      const line = lines.shift() || '';

      if (line.trim().length < 1) {
         continue;
      }
      const row = fixedColumnWidthParser<DockerContainer>(head, line);

      if (/^up/i.test(row.status)) {
         containers.running.push(row);
      }

      containers.all.push(row);
   }

   return containers;
}

export function ps() {
   return run(false);
}

export function psA() {
   return run(true);
}
