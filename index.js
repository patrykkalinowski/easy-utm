var app = new Vue({
  el: '#app',
  data: {
    websiteURL: null,
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
    organicButtons: [
      {
        icon: "fa-facebook-f",
        name: "Facebook Post",
        source: "facebook",
        medium: "post",
        selected: false
      },
      {
        icon: "fa-linkedin",
        name: "LinkedIn Post",
        source: "linkedin",
        medium: "post",
        selected: false
      },
      {
        icon: "fa-twitter",
        name: "Twitter Post",
        source: "twitter",
        medium: "post",
        selected: false
      }
    ],
    paidButtons: [
      {
        icon: "fa-facebook-f",
        name: "Facebook Ad",
        source: "facebook",
        medium: "ppc",
        selected: false
      }
    ],
    customButtons: []
  },
  computed: {
    table: function() {
      var arr = []
      
      buttons = this.organicButtons.concat(this.paidButtons).concat(this.customButtons)

      for (button in buttons) {
        var button = buttons[button]

        if (button.selected) {
          var url = this.websiteURL;
          url += `?utm_source=${button.source}&utm_medium=${button.medium}`
          if (this.utm_campaign) {
            url += `&utm_campaign=${this.utm_campaign}`
          }
          if (this.utm_content) {
            url += `&utm_content=${this.utm_content}`
          }
          if (this.utm_term) {
            url += `&utm_term=${this.utm_term}`
          }

          url = url.toLowerCase()
          url = encodeURI(url)

          arr.push({
            name: button.name || ("Custom: " + button.source + "/" + button.medium),
            url: url 
          })
        }
      }

      return arr
    }
  },
  watch: {
    table: function () {
      console.log("table has changed")
      // TODO: save configuration to localStorage
      // TODO: restore configuration from localStorage on website load
    }
  },
  methods: {
    addCustom: function () {
      console.log("custom")
      this.customButtons.push({
        name: null,
        source: "",
        medium: "",
        selected: true
      })
    },
    removeCustom: function (custom) {
      console.log("remove custom " + custom)
      console.log(this.customButtons.indexOf(custom))
      // this.items.splice(index, 1);
      Vue.delete(this.customButtons, this.customButtons.indexOf(custom))
    }
  }
})