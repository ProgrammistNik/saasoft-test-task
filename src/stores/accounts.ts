import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { Account } from '@/types';
import { v4 as uuid } from 'uuid';

export const useAccountsStore = defineStore('accounts', () => {
  const saved = localStorage.getItem('accounts');
  const initialAccounts: Account[] = saved ? JSON.parse(saved) : [];
  const accounts = ref<Account[]>(initialAccounts);

  watch(
    accounts,
    (newAccounts) => {
      localStorage.setItem('accounts', JSON.stringify(newAccounts));
    },
    { deep: true },
  );

  const addAccount = () => {
    const newAccount: Account = {
      id: uuid(),
      tags: [],
      type: 'Локальная',
      login: null,
      password: null,
    };
    accounts.value.push(newAccount);
  };

  const updateAccount = (index: number, updatedField: Partial<Account>) => {
    Object.assign(accounts.value[index], updatedField);
  };

  const deleteAccount = (index: number) => {
    accounts.value.splice(index, 1);
  };

  return { accounts, addAccount, updateAccount, deleteAccount };
});
