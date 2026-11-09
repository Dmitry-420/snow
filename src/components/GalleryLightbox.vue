<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

interface Shot {
  src: string;
  alt: string;
}

const props = defineProps<{
  shots: Shot[];
}>();

const dialog = ref<HTMLDialogElement | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);

const isOpen = ref(false);
const index = ref(0);
const isLoaded = ref(false);
const imageFailed = ref(false);

const total = computed(() => props.shots.length);
const current = computed(() => props.shots[index.value]);

let previousFocus: HTMLElement | null = null;
let previousOverflow = '';
let touchStartX = 0;
let touchStartY = 0;

function wrap(value: number): number {
  return ((value % total.value) + total.value) % total.value;
}

function prefetch(value: number) {
  if (!total.value) return;

  const shot = props.shots[wrap(value)];

  if (shot) {
    const image = new Image();
    image.src = shot.src;
  }
}

function select(value: number) {
  if (!total.value) return;

  index.value = wrap(value);
  isLoaded.value = false;
  imageFailed.value = false;

  prefetch(index.value + 1);
  prefetch(index.value - 1);
}

async function open(value: number) {
  if (!total.value || !Number.isInteger(value)) return;

  select(value);

  if (!isOpen.value) {
    previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    isOpen.value = true;
  }

  await nextTick();

  if (dialog.value && !dialog.value.open) {
    dialog.value.showModal();
  }

  closeButton.value?.focus();
}

function finishClose() {
  if (!isOpen.value) return;

  isOpen.value = false;
  document.documentElement.style.overflow = previousOverflow;
  previousFocus?.focus();
  previousFocus = null;
}

function close() {
  dialog.value?.close();
  finishClose();
}

function go(step: number) {
  select(index.value + step);
}

function onKey(event: KeyboardEvent) {
  if (!isOpen.value) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    go(1);
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    go(-1);
  }
}

function onGalleryClick(event: MouseEvent) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const target =
    event.target instanceof Element
      ? event.target.closest<HTMLAnchorElement>('[data-gallery-index]')
      : null;

  if (!target || !dialog.value) return;

  const value = Number(target.dataset.galleryIndex);

  if (!Number.isInteger(value) || value < 0 || value >= total.value) {
    return;
  }

  event.preventDefault();
  void open(value);
}

function onTouchStart(event: TouchEvent) {
  const touch = event.changedTouches[0];
  if (!touch) return;

  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

function onTouchEnd(event: TouchEvent) {
  const touch = event.changedTouches[0];
  if (!touch) return;

  const dx = touch.clientX - touchStartX;
  const dy = touch.clientY - touchStartY;

  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
    go(dx < 0 ? 1 : -1);
  }
}

onMounted(() => {
  document.addEventListener('click', onGalleryClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onGalleryClick);

  if (isOpen.value) {
    dialog.value?.close();
    finishClose();
  }
});
</script>

<template>
  <dialog
    ref="dialog"
    class="lightbox"
    aria-label="Фотографии PRONINE Tactic 930"
    @close="finishClose"
    @keydown="onKey"
    @click.self="close"
  >
    <div
      v-if="isOpen && current"
      class="lightbox-content"
    >
      <div class="flex items-center justify-between gap-4 px-4 pt-4 sm:px-8">
        <p class="font-heading text-sm font-bold text-white/80" aria-live="polite">
          {{ index + 1 }} / {{ total }}
        </p>

        <button
          ref="closeButton"
          type="button"
          class="lb-button text-2xl"
          aria-label="Закрыть галерею"
          @click="close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div
        class="relative flex min-h-0 flex-1 items-center justify-center px-14 py-4 sm:px-20"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
        @click.self="close"
      >
        <button
          type="button"
          class="lb-button absolute left-2 z-10 text-3xl sm:left-5"
          aria-label="Предыдущее фото"
          @click="go(-1)"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div
          class="relative flex h-full w-full items-center justify-center"
          @click.self="close"
        >
          <p
            v-if="imageFailed"
            class="text-center text-sm text-white"
            role="status"
          >
            Не удалось загрузить фотографию.
          </p>

          <span
            v-else-if="!isLoaded"
            class="absolute text-sm text-white/70"
            role="status"
          >
            Загрузка…
          </span>

          <img
            :key="current.src"
            :src="current.src"
            :alt="current.alt"
            class="max-h-full w-auto max-w-full rounded-xl object-contain"
            :class="isLoaded && !imageFailed ? 'opacity-100' : 'opacity-0'"
            @load="isLoaded = true"
            @error="imageFailed = true"
          />
        </div>

        <button
          type="button"
          class="lb-button absolute right-2 z-10 text-3xl sm:right-5"
          aria-label="Следующее фото"
          @click="go(1)"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div class="px-4 pb-5 sm:px-8 sm:pb-8">
        <p class="text-center text-sm text-white/75">
          {{ current.alt }}
        </p>

        <div
          class="mx-auto mt-4 flex max-w-max gap-2 overflow-x-auto pb-1"
          aria-label="Выбор фотографии"
        >
          <button
            v-for="(shot, i) in props.shots"
            :key="shot.src"
            type="button"
            class="h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition"
            :class="
              i === index
                ? 'border-amber opacity-100'
                : 'border-transparent opacity-50 hover:opacity-100'
            "
            :aria-label="`Фото ${i + 1}: ${shot.alt}`"
            :aria-pressed="i === index"
            @click="select(i)"
          >
            <img
              :src="shot.src"
              alt=""
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  width: 100%;
  max-width: none;
  height: 100%;
  height: 100dvh;
  max-height: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
  color: white;
  background: rgb(10 16 28 / 97%);
}

.lightbox::backdrop {
  background: rgb(0 0 0 / 80%);
}

.lightbox-content {
  display: flex;
  height: 100%;
  min-height: 0;
  flex-direction: column;
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.lb-button {
  display: flex;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 999px;
  color: white;
  background: rgb(255 255 255 / 10%);
}

.lb-button:hover {
  background: rgb(255 255 255 / 20%);
}
</style>