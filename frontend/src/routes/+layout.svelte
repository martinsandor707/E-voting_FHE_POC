<script>
    import '$lib/app.css'
    import { ModeWatcher } from "mode-watcher";
</script>


<div class="flex flex-col items-center">
    <ModeWatcher/>
    <h1 class="text-4xl p-8">E-voting website demo</h1>
    <div class="h-screen flex justify-center items-center ">
        <slot class=""></slot>
    </div>
</div>