<template>
    <Banner titulo="Sobre Nós" />
    <div class="main-container">
        <h1>Sobre Nós</h1>
        <div class="paragraph-container">
            <p class="text-content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat justo justo, sed ultrices risus vehicula quis. Sed sodales, ipsum et varius ullamcorper, nulla erat accumsan diam, quis pretium ante leo vel lorem. Etiam vestibulum orci ex. Suspendisse eget blandit ex. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus tincidunt ultricies augue et faucibus. Vivamus commodo bibendum purus vitae porta. Proin in sapien quis nunc dictum aliquet in et mauris. Pellentesque ornare, nunc sed rutrum rhoncus, sem lorem blandit elit, vitae interdum dui erat ornare neque.
                <p class="text-paragraph">
                    Nulla faucibus consectetur quam at tincidunt. Vivamus quam ante, tempor ut ultricies quis, vestibulum eu ante. Nullam vitae purus vel nulla dictum condimentum sit amet sit amet quam. Proin dignissim sem purus, et fermentum eros ornare eget. Etiam maximus urna sapien, vitae pretium magna commodo id. Sed mattis nec orci quis rutrum. Vestibulum elit diam, consequat vel varius sed, facilisis in nisi. Phasellus finibus turpis vitae volutpat iaculis. Aenean id turpis eget nisi tempus dapibus non non augue. Aenean ut ullamcorper justo.
                </p>
            </p>
            <p class="map-content">
                <iframe class="map-itself" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28573.217889001222!2d-49.15333402568361!3d-26.466936600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94de940dbec22f4d%3A0xf2864ccc867a7dc1!2sCentro%20Universit%C3%A1rio%20-%20Cat%C3%B3lica%20de%20Santa%20Catarina%20em%20Jaragu%C3%A1%20do%20Sul!5e0!3m2!1spt-BR!2sbr!4v1699398906068!5m2!1spt-BR!2sbr" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </p>
        </div>
    </div>
</template>

<script>
import Banner from "../components/banner.vue";

export default {
    name: "Sobre",
    components: {
        Banner,
    },
};
</script>
<style scoped>
    .paragraph-container {
        display: flex;
        align-items: flex-start;
        text-align: justify;
    }

    .text-content {
        flex-grow: 1;
        padding: 10px;
    }

    .text-paragraph{
        padding-top: 5vh;
    }

    .map-content {
        margin-left: auto;
        padding: 10px;
    }

    .map-itself{
        border: 1px solid;
        border-color: 222222;
        border-radius: 4px;
    }
</style>