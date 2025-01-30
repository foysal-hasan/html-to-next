import React from "react";
import SectionTitle from "./SectionTitle";

const Highlight = ({ text }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center p-2 m-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
    >
      {text}
    </button>
  );
};

function MisconfiguredExposedBuckets({ file_exposure }) {
  if (!Object.values(file_exposure).some((value) => value)) {
    return null;
  }

  return (
    <>
      <SectionTitle>Misconfigured Exposed Buckets</SectionTitle>
      <div>
        {file_exposure?.apache_status && <Highlight text="apache status" />}
        {file_exposure?.docker_registry && <Highlight text="docker registry" />}
        {file_exposure?.ds_store && <Highlight text="ds store" />}
        {file_exposure?.firebase && <Highlight text="firebase" />}
        {file_exposure?.git_config && <Highlight text="git config" />}
        {file_exposure?.json_config && <Highlight text="json config" />}
        {file_exposure?.phpinfo && <Highlight text="phpinfo" />}
        {file_exposure?.vscode_sftp_json && (
          <Highlight text="vscode sftp json" />
        )}
        {file_exposure?.wordpress && <Highlight text="wordpress" />}
      </div>
    </>
  );
}

export default MisconfiguredExposedBuckets;
