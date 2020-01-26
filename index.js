var app = new Vue({
  el: '#app',
  data: {
    websiteURL: "",
    utm_campaign: null,
    utm_content: null,
    utm_term: null,
    caseSensitive: false,
    socialButtons: [
      {
        icon: "fa-facebook-f",
        name: "Facebook",
        source: "facebook",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-linkedin",
        name: "LinkedIn",
        source: "linkedin",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-twitter",
        name: "Twitter",
        source: "twitter",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-instagram",
        name: "Instagram",
        source: "instagram",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-youtube",
        name: "Youtube",
        source: "youtube",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-medium",
        name: "Medium",
        source: "medium",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-quora",
        name: "Quora",
        source: "quora",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-vk",
        name: "VKontakte",
        source: "vkontakte",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-hacker-news",
        name: "Hacker News",
        source: "hacker news",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-product-hunt",
        name: "Product Hunt",
        source: "product hunt",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-reddit-alien",
        name: "Reddit",
        source: "reddit",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-dribbble",
        name: "Dribbble",
        source: "dribbble",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-behance",
        name: "Behance",
        source: "behance",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-pinterest",
        name: "Pinterest",
        source: "pinterest",
        medium: "social",
        selected: false
      },
      {
        icon: "fa-tumblr",
        name: "Tumblr",
        source: "tumblr",
        medium: "social",
        selected: false
      },
    ],
    ownMediaButtons: [
      {
        icon: "fa-envelope",
        name: "Newsletter",
        source: "newsletter",
        medium: "email",
        selected: false
      },
      {
        icon: "fa-at",
        name: "Sales Email",
        source: "sales email",
        medium: "email",
        selected: false
      },
      {
        icon: "fa-dollar-sign",
        name: "Affiliate",
        source: "",
        medium: "affiliate",
        selected: false
      },
      {
        icon: "fa-link",
        name: "Referral",
        source: "",
        medium: "referral",
        selected: false
      },
    ],
    paidSearchButtons: [
      {
        icon: "fa-google",
        name: "Google",
        source: "google",
        medium: "ppc",
        selected: false
      },
      {
        icon: "fa-microsoft",
        name: "Bing",
        source: "bing",
        medium: "ppc",
        selected: false
      },
      {
        icon: "fa-yandex-international",
        name: "Yandex",
        source: "yandex",
        medium: "ppc",
        selected: false
      },
      {
        icon: "fa fa-search",
        name: "DuckDuckGo",
        source: "duckduckgo",
        medium: "ppc",
        selected: false
      },
    ],
    paidOtherButtons: [
      {
        icon: "fa-facebook-f",
        name: "Facebook",
        source: "facebook",
        medium: "cpa",
        selected: false
      },
      {
        icon: "fa-linkedin",
        name: "LinkedIn",
        source: "linkedin",
        medium: "cpa",
        selected: false
      },
      {
        icon: "fa-twitter",
        name: "Twitter",
        source: "twitter",
        medium: "cpa",
        selected: false
      },
      {
        icon: "fa-instagram",
        name: "Instagram",
        source: "instagram",
        medium: "cpa",
        selected: false
      },
      {
        icon: "fa-youtube",
        name: "Youtube",
        source: "youtube",
        medium: "cpa",
        selected: false
      },
      {
        icon: "fa fa-tv",
        name: "Display Advertising",
        source: "banner",
        medium: "display",
        selected: false
      },
    ],
    paidSocialButtons: [
      {
        icon: "fa-facebook-f",
        name: "Facebook",
        source: "facebook",
        medium: "paid social",
        selected: false
      },
      {
        icon: "fa-linkedin",
        name: "LinkedIn",
        source: "linkedin",
        medium: "paid social",
        selected: false
      },
      {
        icon: "fa-twitter",
        name: "Twitter",
        source: "twitter",
        medium: "paid social",
        selected: false
      },
      {
        icon: "fa-instagram",
        name: "Instagram",
        source: "instagram",
        medium: "paid social",
        selected: false
      },
      {
        icon: "fa-youtube",
        name: "Youtube",
        source: "youtube",
        medium: "paid social",
        selected: false
      },
    ],
    customButtons: []
  },
  computed: {
    table: function() {
      var arr = []
      
      buttons = this.socialButtons.concat(this.paidSearchButtons).concat(this.paidSocialButtons).concat(this.paidOtherButtons).concat(this.ownMediaButtons).concat(this.customButtons)

      for (button in buttons) {
        var button = buttons[button]

        if (button.selected) {
          var url = this.websiteURL;
          // always include source and medium
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
          if (!this.caseSensitive) {
            url = url.toLowerCase()
          }
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
      localStorage.setItem("data", JSON.stringify(this.$data))
    }
  },
  mounted: function () {
    var savedData = JSON.parse(localStorage.getItem("data"))

    this.$data.socialButtons = savedData.socialButtons
    this.$data.paidSocialButtons = savedData.paidSocialButtons
    this.$data.paidSearchButtons = savedData.paidSearchButtons
    this.$data.paidOtherButtons = savedData.paidOtherButtons
    this.$data.ownMediaButtons = savedData.ownMediaButtons
    this.$data.customButtons = savedData.customButtons
  },
  methods: {
    addCustom: function () {
      this.customButtons.push({
        name: null,
        source: "",
        medium: "",
        selected: true
      })
    },
    removeCustom: function (custom) {
      Vue.delete(this.customButtons, this.customButtons.indexOf(custom))
    },
    downloadCSV: function () {
      // https://stackoverflow.com/a/14966131
      let csvContent = "data:text/csv;charset=utf-8,"
      // add each row in table to CSV
      this.table.forEach(function(row) {
        let csvRow = `${row.name},${row.url}\r\n`
        csvContent += csvRow ;
      });

      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "UTM.csv");
      document.body.appendChild(link); // Required for FF

      link.click(); // This will download the data file
    }
  }
})