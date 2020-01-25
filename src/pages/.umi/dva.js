import dva from 'dva';
import { Component } from 'react';
import createLoading from 'dva-loading';
import history from '@tmp/history';

let app = null;

export function _onCreate() {
  const plugins = require('umi/_runtimePlugin');
  const runtimeDva = plugins.mergeConfig('dva');
  app = dva({
    history,
    
    ...(runtimeDva.config || {}),
    ...(window.g_useSSR ? { initialState: window.g_initialData } : {}),
  });
  
  app.use(createLoading());
  (runtimeDva.plugins || []).forEach(plugin => {
    app.use(plugin);
  });
  
  app.model({ namespace: 'employeeModel', ...(require('D:/jsStudy/reactL03/housekeeping/src/models/employeeModel.js').default) });
app.model({ namespace: 'goodsModel', ...(require('D:/jsStudy/reactL03/housekeeping/src/models/goodsModel.js').default) });
app.model({ namespace: 'loginModel', ...(require('D:/jsStudy/reactL03/housekeeping/src/models/loginModel.js').default) });
app.model({ namespace: 'report', ...(require('D:/jsStudy/reactL03/housekeeping/src/models/report.js').default) });
app.model({ namespace: 'serviceOrderModel', ...(require('D:/jsStudy/reactL03/housekeeping/src/models/serviceOrderModel.js').default) });
  return app;
}

export function getApp() {
  return app;
}

export class _DvaContainer extends Component {
  render() {
    const app = getApp();
    app.router(() => this.props.children);
    return app.start()();
  }
}
