import React from "react";
import { connect } from "react-redux";
import qs from 'query-string';

import ListBasePage from "../ListBasePage";
import OnlineStatusForm from "../../compoments/onlineStatus/OnlineStatusForm";
import ModalMap from "../../compoments/common/modal/ModalMap";
import GoogleMap from "../../compoments/common/elements/GoogleMap";
import { FieldTypes } from "../../constants/formConfig";

import { actions } from "../../actions";

class OnlineStatusListPage extends ListBasePage {
  initialSearch() {
    return { serviceId: undefined};
  }
  constructor(props) {
    super(props);
    this.objectName = "Online Status";
    this.breadcrumbs = [{ name: "Online Status" }];
    this.props.getAutocomplexService();
    this.autocomplexServices = [];
  }

  getSearchFields() {
    return [
      {
        key: "serviceId",
        seachPlaceholder: "Select Service",
        fieldType: FieldTypes.SELECT,
        options: [...this.autocomplexServices],
        initialValue: this.search.serviceId,
      },
    ];
  }

  handleMarkerClick = (markerProps) => {
    this.dataDetail = markerProps.pointData;
    this.onShowModifiedModal(false);
  }

  render() {
    const { isShowModifiedModal } = this.state;
    const { location: { search }, dataList, autocomplexService, loading } = this.props;
    this.autocomplexServices = autocomplexService.data ? autocomplexService.data.map(c=>{
      return {
        value: c.id,
        label: c.serviceName,
      }
    }) : [];
    return (
      <div>
        {this.renderSearchForm()}
        <GoogleMap
        handleMarkerClick={this.handleMarkerClick}
        points={dataList.data || []}
        isSearched={!!qs.parse(search).serviceId}
        loading={loading}
        />
        <ModalMap
          visible={isShowModifiedModal}
          title={"Agency Information"}
          onCancel={this.onCancelModal}
          width={425}
        >
          <OnlineStatusForm
          dataDetail={this.dataDetail}
          />
        </ModalMap>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.onlineStatus.mapOnlineStatusLoading,
  dataList: state.onlineStatus.onlineStatusData || {},
  autocomplexService: state.onlineStatus.autocomplexService || {}
});

const mapDispatchToProps = (dispatch) => ({
  getDataList: (payload) => dispatch(actions.getOnlineStatusList(payload)),
  getAutocomplexService: (payload) => dispatch(actions.getAutocomplexService(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnlineStatusListPage);
