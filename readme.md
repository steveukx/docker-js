
simple-docker
=============

Node wrapper for running docker commands:

```

import {psA, start} from 'simple-docker';

(async function () {

   const detail: DockerContainerDetail = await psA();
   if (detail.exists('my-container') && !detail.isRunning('my-container')) {
      const running = await start('my-container');
      
      console.log(`Container is ${ running ? 'now' : 'still not' } running`);
   }

})()


```
