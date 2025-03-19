import React from "react";
import SectionTitle from "./SectionTitle";

const Highlight = ({ text, isExposed }) => {
  return (
    <div className="flex items-center gap-2 flex-1">
      <span className="text-gray-300 flex-1">{text}</span>
      <span
        className={`flex-1 text-sm ${
          isExposed ? "text-red-600" : "text-gray-400"
        }`}
      >
        {isExposed ? "Exposed" : "Unexposed"}
      </span>
    </div>
  );
};

function MisconfiguredExposedBuckets({ file_exposure }) {
  if (!file_exposure || !Object.values(file_exposure).some((value) => value)) {
    return null;
  }

  return (
    <>
      <SectionTitle>Exposure</SectionTitle>
      <div className="px-4 py-3 @container">
        <div className="flex overflow-hidden pb-4 rounded-xl border border-[#41474e] bg-[#131416]">
          <div className="flex justify-between flex-1 gap-4 mt-4 px-4">
            <div className="space-y-3 flex-1">
              <Highlight
                text="Apache Status"
                isExposed={file_exposure?.apache_status}
              />
              <Highlight text="DS_Store" isExposed={file_exposure?.ds_store} />
              <Highlight
                text="Git Config"
                isExposed={file_exposure?.git_config}
              />
              <Highlight text="Phpinfo" isExposed={file_exposure?.phpinfo} />
              <Highlight
                text="Wordpress"
                isExposed={file_exposure?.wordpress}
              />
            </div>
            <div className="space-y-3 flex-1">
              <Highlight
                text="Docker Registry"
                isExposed={file_exposure?.docker_registry}
              />
              <Highlight text="Firebase" isExposed={file_exposure?.firebase} />
              <Highlight
                text="Json Config"
                isExposed={file_exposure?.json_config}
              />
              <Highlight
                text="vscode sftp.json"
                isExposed={file_exposure?.vscode_sftp_json}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MisconfiguredExposedBuckets;
