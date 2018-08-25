import { dockerContainerAction } from '../util/docker-container-action';

export function stop (...containers: string[]) {
   return dockerContainerAction(['stop'], containers);
}


