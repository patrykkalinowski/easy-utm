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
    ]
  },
  computed: {
    table: function() {
      var arr = []
      
      buttons = this.organicButtons.concat(this.paidButtons)
      console.log(buttons)
      for (button in buttons) {
        var button = buttons[button]

        if (button.selected) {
          console.log("button selected")
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
            name: button.name,
            url: url 
          })
        }
      }

      return arr
    }
  },
  methods: {
    toggle: function () {
      console.log("Toggled")
    }
  }
})