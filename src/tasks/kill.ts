import { dockerContainerAction } from '../util/docker-container-action';

export function kill (...containers: string[]) {
   return dockerContainerAction(['kill'], containers);
}


