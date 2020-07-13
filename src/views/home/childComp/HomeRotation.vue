<template>
    <rotation :interval = "1000" :showIndicator = "false">
        <rotation-item v-for="(item,index) in cbanners" :key="index">
            <a :href="item.href">
                <img :src="path+bannerSrc+item.crs" />
            </a>
        </rotation-item>
    </rotation>
</template>

<script>
import Rotation from "components/common/rotation/Rotation";
import RotationItem from "components/common/rotation/RotationItem";
export default {
    name: "HomeRotation",
    components: {
        Rotation,
        RotationItem
    },
    props: {
        cbanners: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            path: "http://106.12.85.17:9091/",
            bannerSrc: "public/image/banner/"
        };
    }
};
</script>

<style scoped>
</style>