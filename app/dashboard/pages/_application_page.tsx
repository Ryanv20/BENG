// app/dashboard/pages/ApplicationPage.tsx
"use client";
import { useEffect, useState } from "react";

import TargetCompanies from "./components/Target";
import MessageTemplate from "./components/MessageTemplate";
import Attachments from "./components/attachments";
import ApplicationSendController from "./components/ApplicationSendController";
import LiveStatusFeed from "./components/LiveStatusFeed";
export default function Application() {
  return (
<div className="flex-1 flex flex-col gap-10">
    <TargetCompanies />
    <MessageTemplate />
    <Attachments />
    <ApplicationSendController />
    <LiveStatusFeed />
</div>

  );
}
