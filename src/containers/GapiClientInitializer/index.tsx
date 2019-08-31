import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { application } from '../../actions/Application';
import { CombinedState } from '../../reducers/root';
import GoogleApiConfig from '../../GoogleApiConfig';

interface StateProps {
  isSignIned: boolean;
  isGapiClientInitialized: boolean;
}

interface DispatchProps {
  signIn: () => void;
  initializeGapiClient: () => void;
}

type EnhancemembersProps = StateProps & DispatchProps;

const mapStateTopProps = (state: CombinedState): StateProps => ({
  isSignIned: state.application.isSignIned,
  isGapiClientInitialized: state.application.isGapiClientInitialized,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      initializeGapiClient: () => application.initializeGapiClient(),
      signIn: () => application.signIn(),
    },
    dispatch,
  );

const GapiClientInitializer: React.FC<EnhancemembersProps> = ({
  initializeGapiClient,
  signIn,
  children,
}) => {
  const initClient = () => {
    gapi.client
      .init({
        apiKey: GoogleApiConfig.API_KEY,
        clientId: GoogleApiConfig.CLIENT_ID,
        discoveryDocs: GoogleApiConfig.DISCOVERY_DOCS,
        scope: GoogleApiConfig.SCOPES,
      })
      .then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
          initializeGapiClient();
          signIn();
        });

        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
          initializeGapiClient();
          signIn();
        } else {
          initializeGapiClient();
        }
      });
  };

  useEffect(() => {
    gapi.load('client:auth2', initClient);
  }, []);

  return <>{children}</>;
};

export default connect(
  mapStateTopProps,
  mapDispatchToProps,
)(GapiClientInitializer);
