<template>
  <AccountRow v-for="(account, index) in accounts" :key="account.id" :account :index />
</template>

<script setup lang="ts">
  import AccountRow from './AccountRow.vue';
  import { useAccountsStore } from '@/stores/accounts';

  const { accounts } = useAccountsStore();
</script>
