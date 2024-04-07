<script>
    import '$lib/app.css'
    import { ModeWatcher, toggleMode } from "mode-watcher";
    
</script>

<!--<button class="absolute top-0 right-0 text-4xl" on:click={toggleMode}>🌗</button> -->
<div class="flex flex-col items-center">
    <ModeWatcher defaultMode="dark"/>
    <a href="/"><h1 class="text-4xl p-8 text-green-500">E-voting website demo</h1></a>

    <div class="h-screen flex justify-center items-center ">
        <slot></slot>
    </div>
</div>