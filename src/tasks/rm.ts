import { dockerContainerAction } from '../util/docker-container-action';


export function rmF (...containers: string[]) {
   return run(true, containers);
}

export function rm (...containers: string[]) {
   return run(false, containers);
}

async function run (force: boolean, containers: string[]): Promise<boolean> {
   return await dockerContainerAction(['rm', force ? '-f' : ''], containers);
}
