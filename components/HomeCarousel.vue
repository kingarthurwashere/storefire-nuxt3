<template>
    <div class="relative slide">
        <!-- <div class="carousel-indicators absolute bottom-0 flex bg-yellow-100 h-12 w-full justify-center items-center">
            <ol class="z-50 flex w-4/12 justify-center">
                <li v-for="(img, i) in images" :key="i" class="md:w-4 md:h-4 bg-gray-300 rounded-full cursor-pointer mx-2">
                </li>
            </ol>
        </div> -->
        <div class="carousel-inner relative overflow-hidden w-full rounded-[10px]">
            <div v-for="(img, i) in images" :id="`slide-${i}`" :key="i" :class="`${active === i ? 'active' : 'left-full'}`"
                class="carousel-item inset-0 relative w-full transform transition-all duration-500 ease-in-out">
                <img class="block w-full" :src="img" alt="Slide" />
            </div>
        </div>
    </div>
</template>

<script>
// Import images here
import slider from '/images/slider.jpg';
import slider1 from '/images/slider-1.jpg';
import slider2 from '/images/slider-2.jpg';
import slider3 from '/images/slider-3.jpg';
import slider4 from '/images/slider-4.jpg';

export default {
    data ()
    {
        return {
            images: [
                slider,
                slider1,
                slider2,
                slider3,
                slider4
            ],
            active: 0
        };
    },
    mounted ()
    {
        let i = 0;
        setInterval( () =>
        {
            if ( i > this.images.length - 1 )
            {
                i = 0;
            }
            this.active = i;
            i++;
        }, 3000 ); // Change the interval time as needed
    }
};
</script>

<style>
.left-full {
    left: -100%;
}

.carousel-item {
    float: left;
    position: relative;
    display: block;
    height: 400px;
    width: 100%;
    margin-right: -100%;
    backface-visibility: hidden;
    margin-top: 0px;
}

.carousel-item.active {
    left: 0;
}

.carousel-indicators {
    position: absolute;
    bottom: 10px; /* Adjust this value as needed */
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -10px; /* Adjust the negative margin to close the gap */
}

.carousel-indicators ol {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
}

.carousel-indicators li {
    width: 10px; /* Adjust indicator size */
    height: 10px; /* Adjust indicator size */
    background-color: rgba(0, 0, 0, 0.5); /* Adjust indicator color */
    border-radius: 50%;
    margin: 0 5px; /* Adjust spacing between indicators */
    cursor: pointer;
}

.carousel-indicators li.active {
    background-color: rgba(0, 0, 0, 0.9); /* Adjust active indicator color */
}


@media (max-width: 768px) {
    .carousel-item {
        height: auto;
        margin-top: 0px;
    }

    .carousel-indicators {
        bottom: 20px; /* Adjust bottom spacing */
    }
}

</style>
