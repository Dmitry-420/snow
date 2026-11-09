<script setup lang="ts">
import { ref } from 'vue';
import { contacts } from '../data/product';

const name = ref('');
const phone = ref('');
const message = ref('');
const draftOpened = ref(false);
const errorText = ref('');

function resetStatus() {
  draftOpened.value = false;
  errorText.value = '';
}

function onSubmit(event: SubmitEvent) {
  event.preventDefault();

  const form = event.currentTarget;

  if (!(form instanceof HTMLFormElement) || !form.reportValidity()) {
    return;
  }

  const cleanName = name.value.trim();
  const cleanPhone = phone.value.trim();
  const cleanMessage = message.value.trim();
  const phoneDigits = cleanPhone.replace(/\D/g, '');

  errorText.value = '';
  draftOpened.value = false;

  if (cleanName.length < 2) {
    errorText.value = 'Укажите имя: минимум два символа.';
    return;
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errorText.value = 'Укажите телефон: от 10 до 15 цифр с кодом страны.';
    return;
  }

  if (!cleanMessage) {
    errorText.value = 'Напишите ваш вопрос.';
    return;
  }

  const subject = 'Вопрос о снегоступах PRONINE Tactic 930';

  const body = [
    `Имя: ${cleanName}`,
    `Телефон: ${cleanPhone}`,
    '',
    'Вопрос:',
    cleanMessage,
  ].join('\n');

  const mailto =
    `mailto:${contacts.email}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
  draftOpened.value = true;
}
</script>

<template>
  <form
    class="mt-8 space-y-4"
    @submit="onSubmit"
    @input="resetStatus"
  >
    <div>
      <label for="cf-name" class="mb-2 block text-sm font-bold">
        Как к вам обращаться
      </label>

      <input
        id="cf-name"
        v-model="name"
        name="name"
        type="text"
        autocomplete="name"
        required
        minlength="2"
        maxlength="100"
        placeholder="Иван"
        class="w-full rounded-xl border border-line bg-snow px-4 py-3 text-sm transition focus:border-ink focus:bg-white"
      />
    </div>

    <div>
      <label for="cf-phone" class="mb-2 block text-sm font-bold">
        Телефон для связи
      </label>

      <input
        id="cf-phone"
        v-model="phone"
        name="phone"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        required
        minlength="10"
        maxlength="30"
        placeholder="+7 900 000-00-00"
        class="w-full rounded-xl border border-line bg-snow px-4 py-3 text-sm transition focus:border-ink focus:bg-white"
      />
    </div>

    <div>
      <label for="cf-message" class="mb-2 block text-sm font-bold">
        Вопрос
      </label>

      <textarea
        id="cf-message"
        v-model="message"
        name="message"
        rows="4"
        required
        maxlength="1000"
        placeholder="Например: обувь 43-го размера, вес со снаряжением 95 кг. Подойдёт ли модель?"
        class="w-full resize-y rounded-xl border border-line bg-snow px-4 py-3 text-sm transition focus:border-ink focus:bg-white"
      ></textarea>
    </div>

    <button type="submit" class="btn btn-primary w-full">
      Открыть письмо
    </button>

    <p
      v-if="errorText"
      class="rounded-xl bg-amber/15 px-4 py-3 text-sm text-ink"
      role="alert"
    >
      {{ errorText }}
    </p>

    <p
      v-if="draftOpened"
      class="rounded-xl bg-frost px-4 py-3 text-sm leading-relaxed text-ink"
      role="status"
    >
      Мы запросили открытие почтовой программы. Проверьте письмо и нажмите
      «Отправить» в ней. Если программа не открылась, напишите на
      <a
        :href="`mailto:${contacts.email}`"
        class="font-bold underline"
      >
        {{ contacts.email }}
      </a>
      или позвоните
      <a :href="contacts.phoneHref" class="font-bold underline">
        {{ contacts.phone }}
      </a>.
    </p>

    <p class="text-xs leading-relaxed text-ink/60">
      Данные из формы попадут в подготовленное письмо.
      Они будут переданы получателю после отправки из вашей почтовой программы.
    </p>
  </form>
</template>