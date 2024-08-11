
import React from 'react';
import { Link } from 'react-router-dom';

import ApprovalsView from "../../Components/ApprovalView/ApprovalsView";
import NavigationBar from "../../Components/NavigationBar/NavigationBar";
import globalStyles from '../../globalStyles.module.css';

function ApprovalsPage() {
    return (
        <div className={globalStyles.div_main}>
            <NavigationBar />
              <ApprovalsView />
        </div>
    );
}

export default ApprovalsPage;