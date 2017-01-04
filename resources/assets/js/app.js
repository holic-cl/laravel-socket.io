
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('app-notification-form', require('./components/AppNotificationForm.vue'));
Vue.component('app-navbar', require('./components/AppNavbar.vue'));

var socket = io('http://192.168.8.103:3000')

const app = new Vue({
    el: '#app',

    components: [
      'app-notification-form',
      'app-navbar'
    ],

    mounted: function () {
      socket.on('test-channel:App\\Events\\NotificationSent', function (data) {
        this.notify(data)
      }.bind(this))
    },

    methods: {
      notify(data) {
        this.$root.$emit('notify', data);
      }
    }
});
