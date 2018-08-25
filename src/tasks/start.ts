import { dockerContainerAction } from '../util/docker-container-action';

export function start (...containers: string[]) {
   return dockerContainerAction(['start'], containers);
}


