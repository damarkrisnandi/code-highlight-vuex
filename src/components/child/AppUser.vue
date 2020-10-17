<template>
<div class='flex top-bar'>
    <span class="d-flex" align="right">

      <label v-if="$store.state.user.userId" class="login-name"> Welcome, <strong>{{$store.state.user.userName}}</strong> </label>
      <app-text-input v-if="!$store.state.user.userId" v-model="inputName" name="user-input" label="" class="user-input space" align="right"/>
      <app-button 
        v-if="!$store.state.user.userId"
        name="masuk"
        label="Login"
        class="margin-left space"
        @onClick="ketikaTombolMasukDiKlik"
        />
        <app-button 
        v-if="!$store.state.user.userId"
        name="daftar"
        label="Register"
        class="margin-left space"
        color="success"
        @onClick="ketikaTombolDaftarDiKlik"/>
        <app-button 
            v-if="$store.state.user.userId"
            name="keluar"
            label="Logout"
            color="error"
            @onClick="ketikaTombolKeluarDiKlik"/>
    </span>
</div>
</template>

<script>
import AppButton from '../base/AppButton';
import AppTextInput from '../base/AppTextInput';
import { dapatkanOpsi } from '../../utils/index';
export default {
    name: 'AppUser',
  data() {
    return {
      inputName: 'udin',
      loginName: null,
      registerName: null,

      daftarBahasaPemrograman: [],
      daftarTwoslash: ['twoslash', 'tsconfig'],
      bahasaPemrogramanTerpilih: null
    }
  },
  components: {
      AppButton,  
      AppTextInput,
  },
  created() {
    this.dapatkanDaftarBahasaPemrograman()
  },
  methods: {
    ketikaTombolMasukDiKlik() {
      this.loginName = this.inputName;
      this.$store.dispatch('user/login', {
        userName: this.loginName
      })
    },
    ketikaTombolDaftarDiKlik() {
      this.registerName = this.inputName;
      this.$store.dispatch('user/register', {
        userName: this.registerName
      })
    },
    ketikaTombolKeluarDiKlik() {
      this.$store.dispatch('user/logout')
      this.$emit('keluar')
    },

    async dapatkanDaftarBahasaPemrograman() {
      try {
        const respon = await dapatkanOpsi()
        if (respon.success && !respon.error) {
          this.daftarBahasaPemrograman = respon.data.languages
        }
      } catch (error) {
        const dataNotifikasiGalat = {
          isShowNotif: true,
          message: error.message
        }
        this.$store.dispatch('notification/showNotif', dataNotifikasiGalat)
        console.log(error)
      }
    }
  }
}
</script>
<style scoped>
    .d-flex {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content:flex-end;
    }

    .space {
        margin: 2px;
    }

    .user-input {
        margin-right: 10px;
    }

    .login-name {
        margin-right: 10px;
    }
    .top-bar {
    }
</style>