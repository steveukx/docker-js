import { execP } from './exec-p';

export async function dockerContainerAction(actions: string[], containers: string[]): Promise<boolean> {

   let success = true;
   try {
      const commands = [
         ...(actions.filter(Boolean)),
         ...containers
      ];

      await execP('docker', ...commands);
   }
   catch (e) {
      success = /no such container/i.test(e);
      if (!success) {
         throw e;
      }
   }

   return success;

}
