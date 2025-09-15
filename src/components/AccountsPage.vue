<template>
  <v-container class="d-flex flex-column ga-6">
    <div class="d-flex ga-3 align-center">
      <h1>Учетные записи</h1>
      <v-btn rounded="lg" icon="mdi-plus" @click="addAccount" />
    </div>

    <v-alert :text="alertText" type="info" />

    <v-form>
      <v-row>
        <v-col v-for="field in accountFields" :key="field.label" :cols="field.cols">
          <v-label :text="field.label" />
        </v-col>

        <v-col cols="1"></v-col>
      </v-row>
      <AccountsList />
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
  import type { AccountField } from '@/types';
  import AccountsList from './AccountsList.vue';
  import { useAccountsStore } from '@/stores/accounts';

  const { addAccount } = useAccountsStore();

  const accountFields: AccountField[] = [
    {
      label: 'Метки',
      cols: 3,
    },
    {
      label: 'Тип записи',
      cols: 2,
    },
    {
      label: 'Логин',
      cols: 3,
    },
    {
      label: 'Пароль',
      cols: 3,
    },
  ];

  const alertText =
    'Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;';
</script>
