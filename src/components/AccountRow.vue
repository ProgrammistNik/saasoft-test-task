<template>
  <v-row>
    <v-col cols="3">
      <v-textarea
        v-model="localTags"
        density="compact"
        variant="outlined"
        maxlength="50"
        counter
        auto-grow
        rows="1"
        class="text-wrap"
        @blur="saveField('tags')"
      />
    </v-col>

    <v-col cols="2">
      <v-select
        :items="['Локальная', 'LDAP']"
        v-model="localAccount['type']"
        density="compact"
        variant="outlined"
        @update:model-value="saveField('type')"
      />
    </v-col>

    <v-col :cols="isLdap ? '6' : '3'">
      <v-text-field
        v-model="localAccount['login']"
        ref="loginRef"
        density="compact"
        variant="outlined"
        maxlength="100"
        counter
        :rules="[rules.required, rules.minLength(3)]"
        @blur="saveField('login')"
      />
    </v-col>

    <v-col v-if="!isLdap" cols="3">
      <v-text-field
        v-model="localAccount['password']"
        ref="passwordRef"
        density="compact"
        variant="outlined"
        maxlength="100"
        counter
        :rules="[rules.required, rules.minLength(3)]"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
        @blur="saveField('password')"
      />
    </v-col>

    <v-col cols="1">
      <v-btn
        icon="mdi-trash-can"
        density="comfortable"
        variant="text"
        rounded="lg"
        @click="deleteAccount(index)"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import type { Account } from '@/types';
  import { computed, reactive, ref, watch } from 'vue';
  import { useAccountsStore } from '@/stores/accounts';
  import { stringToTagsArray, tagsArrayToString } from '@/utils/tags';
  import type { VTextField } from 'vuetify/components';

  const loginRef = ref<InstanceType<typeof VTextField> | null>(null);
  const passwordRef = ref<InstanceType<typeof VTextField> | null>(null);

  const { deleteAccount, updateAccount } = useAccountsStore();

  const props = defineProps<{ account: Account; index: number }>();

  const localAccount = reactive({ ...props.account });
  const localTags = ref(tagsArrayToString(props.account.tags));

  const isLdap = computed(() => localAccount.type === 'LDAP');

  const showPassword = ref(false);

  const rules = {
    required: (value: string) => !!value || 'Обязательное поле',
    minLength: (min: number) => (value: string) => value?.length >= min || `Минимум ${min} символа`,
  };

  const saveField = async (key: keyof Account) => {
    if (key === 'login' && loginRef.value) {
      const errors: string[] = await loginRef.value.validate();
      if (errors.length > 0) return;
    }

    if (key === 'password' && passwordRef.value) {
      const errors: string[] = await passwordRef.value.validate();
      if (errors.length > 0) return;
    }

    if (key === 'tags') {
      updateAccount(props.index, { tags: stringToTagsArray(localTags.value) });
    } else {
      updateAccount(props.index, { [key]: localAccount[key] });
    }
  };

  watch(
    () => localAccount.type,
    (newType) => {
      if (newType === 'LDAP' && localAccount.password) {
        localAccount.password = null;
        updateAccount(props.index, { password: null });
      }
    },
  );
</script>
