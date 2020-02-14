const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-1' })
const year = new Date().getFullYear()
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
const randomTeam = (teams) => Math.floor((Math.random() * (teams.length-1)) | 0);
exports.handler = async function (event, context) {
  const getParams = {
    Bucket: 'pickmyteam.name',
    Key: 'r_teams'
  }
  try {
    const output = await s3.getObject(getParams).promise();
    const teams = output.Body.toString().split('\n');
    const randomValues = randomTeam(teams);
    console.log(randomValues)
    const randTeam = teams[randomValues];
    // const logo = randTeam.string.toString().split(' ')[-1].toLowerCase() + '.gif'
    const responseString = `Your NFL Team for the ${year} season is: The ${randTeam}`
    const resp = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: responseString 
    }
    return resp;
  } catch (err) {
    return err;
  }
}

exports.handler().then(data => console.log(data));
