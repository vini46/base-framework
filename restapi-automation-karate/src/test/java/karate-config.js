function() {
  var env = karate.env; // get system property 'karate.env'
  karate.log('karate.env system property was:', env);
  if (!env) {
    env = 'staging';
  }
  var config = {
    env: env,
  }
  if (env == 'staging') {
    karate.configure('retry',{ count:10, interval:10000});
    config = karate.call('file:src/test/java/com/sample/api/tests/helpers/utility.js',config);
    config.envName = 'staging';
    config.baseUrl = 'https://www.metaweather.com/api/';
    karate.configure('connectTimeout', 60000);
    karate.configure('readTimeout', 60000);
  }
   return config;
}