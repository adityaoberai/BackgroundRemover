<script lang="ts" context="module">
    export type ToastData = {
        title: string
        description: string
        color: string
    }
   
    const {
        elements: { content, title, description },
        helpers,
        states: { toasts },
        actions: { portal }
    } = createToaster<ToastData>();
   
    export const addToast = helpers.addToast;
</script>
   
<script lang="ts">
    import { createToaster, melt } from '@melt-ui/svelte'
</script>
   
<div class="toastPortal" use:portal>
    {#each $toasts as { id, data } (id)}
        <div class="toastContainer" use:melt={$content(id)}>
            <div class="toastCard">
                <h3 use:melt={$title(id)} style:color={data.color}>
                    {data.title}
                    <span style:color={data.color} />
                </h3>
                <div use:melt={$description(id)}>
                    {data.description}
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .toastPortal {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
    }

    .toastContainer {
        width: 30%;
        border: 1px solid #ccc;
        margin: 0.5rem;
        justify-content: center;
    }
    
    .toastCard {
        display: flex;
        flex-direction: row;
        padding: 1rem;
        align-items: center;
        justify-content: center;
    }

    .toastCard h3 {
        font-size: 1rem;
        margin-right: 0.5rem;
    }

    .toastCard span {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }
</style>