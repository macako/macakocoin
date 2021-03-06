const axios = require('axios');
const colors = require('colors');

class CoinBase {
  constructor(table, apiName, sourceUrl) {
    this.table = table;
    this.humanizeIsEnabled = true;
    this.apiName = apiName;
    this.sourceUrl = sourceUrl;
    this.updater();
    this.interval = setInterval(() => this.updater, 30000);
  }

  async updater() {
    try {
      const response = await axios.get(this.sourceUrl);
      this.updateData(response.data);
    } catch (error) {
      console.error(
        `${this.apiName} is not working now. Please try again later. ${error} `.red
      );
    }
  }

  setDataTable(data) {
    this.table.setData({
      headers: this.headers,
      data: data
    });

    if (this.isRefreshTable) {
      this.table.rows.select(this.rowSelected);
      this.isRefreshTable = false;
    }

    this.table.screen.render();
  }

  refreshTable(table) {
    this.rowSelected = this.table.rows.selected;
    this.isRefreshTable = true;
    this.table = table;
    this.updater();
  }
  updateData(data) {
    //plese, replace this function in the child
  }
}

module.exports = CoinBase;
