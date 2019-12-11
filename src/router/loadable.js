import React from 'react';
import Loadable from 'react-loadable';
import Loading from 'components/Loading/Loading.jsx'

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader,loading = Loading)=>{
    return Loadable({
        loader,
        loading
    });
}
