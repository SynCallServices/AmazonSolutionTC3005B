import "amazon-connect-streams";
import { Component } from "react";
import React from "react";
import { useState, useEffect } from "react";

//connect.core.initCCP({ /* ... */ });

class CCP extends Component {
  constructor(props) {
    super(props);
    this.containerDiv = React.createRef();
    this.state = {
      check: ''
    }
  }

  componentDidMount() {
    let instanceURL = "https://csf-test-1.my.connect.aws/ccp-v2";
    // eslint-disable-next-line no-undef
    connect.core.initCCP(document.getElementById("ccp"), {
      ccpUrl: instanceURL,            // REQUIRED
      loginPopup: true,               // optional, defaults to `true`
      loginPopupAutoClose: true,      // optional, defaults to `false`
      loginOptions: {                 // optional, if provided opens login in new window
        autoClose: true,              // optional, defaults to `false`
        height: 600,                  // optional, defaults to 578
        width: 400,                   // optional, defaults to 433
        top: 0,                       // optional, defaults to 0
        left: 0                       // optional, defaults to 0
      },
      region: "us-east-1",         // REQUIRED for `CHAT`, optional otherwise
      softphone: {                    // optional, defaults below apply if not provided
        allowFramedSoftphone: true,   // optional, defaults to false
        disableRingtone: false,       // optional, defaults to false
        ringtoneUrl: "./ringtone.mp3" // optional, defaults to CCP’s default ringtone if a falsy value is set
      },
      pageOptions: { //optional
        enableAudioDeviceSettings: false, //optional, defaults to 'false'
        enablePhoneTypeSettings: true //optional, defaults to 'true' 
      },
      ccpAckTimeout: 5000, //optional, defaults to 3000 (ms)
      ccpSynTimeout: 3000, //optional, defaults to 1000 (ms)
      ccpLoadTimeout: 10000 //optional, defaults to 5000 (ms)
    });

    // eslint-disable-next-line no-undef
    connect.contact((contact) => {
      contact.onConnected((contact) => {
        console.log(contact);
        if (contact) {
          this.setState.check = 'call connected';
          console.log('pop')

        };
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.check ? <p>{this.state.check}</p> : null}
      </div>
    );
  }
}

export default function App() {
  const [check, setCheck] = useState('');
  //let callConnectStatus = document.getElementByName('amazon-connect-ccp').contentWindow.document.getElementById('connectionTab-primary-status');
  //let c = document.getElementById('ccp').children[0].contentWindow.document.getElementById('connectionTab-primary-status');


  return (
    <div className="App">
      <div id="ccp" style={{ width: "320px", height: "500px" }}>
        <CCP />
        {check ? check : null}
      </div>
    </div>
  );
}
