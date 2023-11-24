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
            <h3 use:melt={$title(id)} style:color={data.color}>
                {data.title}
                <span style:color={data.color} />
            </h3>
            <div use:melt={$description(id)}>
                {data.description}
            </div>
        </div>
    {/each}
</div>

<style>
    .toastPortal {
        position: absolute;
        width: 100%;
        bottom: 2rem;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: center;
    }

    .toastContainer {
        width: 40%;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #ccc;
        margin: 0.5rem;
        display: flex;
        flex-direction: row;
        padding: 1rem;
        align-items: center;
        justify-content: center;
    }

    .toastContainer h3 {
        font-size: 1rem;
        margin-right: 0.5rem;
    }

    .toastContainer span {
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
    }

    @media screen and (max-width: 900px) {
        .toastContainer {
            width: 70%;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #ccc;
            margin: 0.5rem;
            display: flex;
            flex-direction: row;
            padding: 1rem;
            align-items: center;
            justify-content: center;
        }
    }
</style>