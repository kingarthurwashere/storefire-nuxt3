<template>
    <div class="relative mx-auto max-w-screen-lg px-4 py-8">
        <div class="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
            <div class="grid grid-cols-2 gap-4 md:grid-cols-1 mt-36">
                <div class="mt-12">
                    <div class="w-full">
                      <div class="grid grid-cols-6 gap-4">
                        <div class="col-start-1 col-end-5 ...">
                          <div
                            class="rounded-lg w-full object-cover transition duration-500 group-hover:scale-105"
                            alt=""
                            srcset=""
                          >
                            <div
                              class="skeleton-block rounded-lg skeleton-effect-fade mb-4"
                              style="height: 300px"
                            ></div>
                          </div>
                          <div
                            class="rounded-lg w-full object-cover transition duration-500 group-hover:scale-105"
                            alt=""
                            srcset=""
                          >
                            <div
                              class="skeleton-block rounded-lg skeleton-effect-fade mb-4"
                              style="height: 300px"
                            ></div>
                          </div>
                        </div>
                        <div class="col-end-7 col-span-2 flex flex-col items-start">
                          <div
                            class="rounded-lg w-full mb-2 object-cover transition duration-500 group-hover:scale-105"
                            alt=""
                            srcset=""
                          >
                            <div
                              class="skeleton-block rounded-lg skeleton-effect-fade mb-2"
                              style="height: 120px"
                            ></div>
                          </div>
                          <div
                            class="rounded-lg w-full mb-2 object-cover transition duration-500 group-hover:scale-105"
                            alt=""
                            srcset=""
                          >
                            <div
                              class="skeleton-block rounded-lg skeleton-effect-fade mb-4"
                              style="height: 120px"
                            ></div>
                            <div
                              class="skeleton-block rounded-lg skeleton-effect-fade mb-4"
                              style="height: 120px"
                            ></div>
                            <div
                              class="skeleton-block rounded-lg skeleton-effect-fade mb-4"
                              style="height: 120px"
                            ></div>
                          </div>
                        </div>
                      </div>
            
                      
                    </div>
                  </div>
            </div>
    
            <div class="sticky top-[190px]">
                <div class="mt-12">
                    <div class="w-full">
                      
            
                      <span
                        class="rounded-lg w-full mt-6 align-baseline long_line skeleton-text skeleton-effect-fade"
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quisquam cupiditate ullam veritatis dolores obcaecati nemo
                        voluptate. Rem sint est nihil nulla numquam, neque
                        reprehenderit laborum exercitationem accusamus animi
                        veritatis aspernatur.</span
                      >
                    </div>
                </div>

                <div class="mt-12">
                    <div class="w-full">
                      
            
                      <div v-for="(i, key) in [1,23,4,6,7,8,9,0,3,4] "
                       :key class="rounded-lg w-full mt-6 long_line skeleton-text skeleton-effect-fade"
                        >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </div>
                     
                    </div>
                </div>
            </div>
          </div>
        </div>
    
</template>