export const dbconf = {
  key: "stemplinlyoughtweralselo",
  password: "7fd1203466b88c80e25b1dae1dce5df44bf31784",
  username: "29687c30-0299-4d0d-b688-ab757ed76402-bluemix",
  domain: "cloudantnosqldb.appdomain.cloud",
  dbname: "erpdb",
  syncOpts: { live: true, retry: true }
};

export function dburl() {
  return `https://${dbconf.key}:${dbconf.password}@${dbconf.username}.${dbconf.domain}/${dbconf.dbname}`;
}
