<script lang="ts" setup>

import AppBtn from "@/components/UI/AppBtn/AppBtn.vue";</script>
<template>
    <main class="not-found">
        <div class="container">
            <h2 class="not-found__title">404</h2>
            <h4>
                Page not found
            </h4>
            <div class="not-found__btns">
                <app-btn :to="{
                    name: 'Main'
                }">
                    Go to main
                </app-btn>
            </div>
        </div>
    </main>

</template>

