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
      console.log(this.$data)
      localStorage.setItem("data", JSON.stringify(this.$data))
      // TODO: save configuration to localStorage
      // TODO: restore configuration from localStorage on website load
    }
  },
  mounted: function () {
    var savedData = JSON.parse(localStorage.getItem("data"))
    console.log(this.$data)
    console.log(savedData)

    this.$data.organicButtons = savedData.organicButtons
    this.$data.paidButtons = savedData.paidButtons
    this.$data.customButtons = savedData.customButtons
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