#!/usr/bin/env node

var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = parseInt(process.env.PORT, 10) || 8080,
    publicDir = process.argv[2] || __dirname + '/dist',
    path = require('path'),
    fs = require('fs'),
    files = fs.readdirSync('./public/images/photo-gallery');

app.get("/", function (req, res) {
    res.sendFile(path.join(publicDir, "/index.html"));
});

app.get("/rsvp", function (req, res) {
    res.sendFile(path.join(publicDir, "/rsvp.html"));
});

app.get("/photos", function (req, res) {
    res.sendFile(path.join(publicDir, "/photos.html"));
});

app.get("/travel", function (req, res) {
    res.sendFile(path.join(publicDir, "/travel.html"));
});

app.get("/gifts", function (req, res) {
    res.sendFile(path.join(publicDir, "/gifts.html"));
});

app.get("/photo-gallery", function (req, res) {
    res.send({files: files});
});

app.get("/form", function (req, res) {
    const name = req.query.name.toLowerCase();
    const db = {
      'the chau family': 'https://docs.google.com/forms/d/e/1FAIpQLSeiW29LxeUg4eeYZrUStZ2WNF9IegHYBWqfD1uhF651nyNByA/viewform?usp=sf_link',
      'ms. gillian lim': 'https://docs.google.com/forms/d/e/1FAIpQLSddf261LUuM6uXooIqf5dmfcNmNkvofEwi__Vy1Bh_WQvTCAA/viewform?usp=sf_link',
      'mrs. marcia hsu and jachin hsu': 'https://docs.google.com/forms/d/e/1FAIpQLSfjIuQxrM5jMtCzZ3Ho2A5Tdfu-MTnzjLN49gC1Q4q94rwMQQ/viewform?usp=sf_link',
      'mr. & mrs. isaac lim and family': 'https://docs.google.com/forms/d/e/1FAIpQLSe7CvK_oW3jcVFX0Ajt3ZY__59hX5DkcQGx5MpnJC8vNZURLQ/viewform?usp=sf_link',
      'mr. & mrs. sing young and family': 'https://docs.google.com/forms/d/e/1FAIpQLSf4JnQfzciEKhoMLDVVcox4uotl32H7j4aXAHqAWy57hacqLg/viewform?usp=sf_link',
      'ian and melissa meron': 'https://docs.google.com/forms/d/e/1FAIpQLSeaKrGKYn_EQVdPNop9Ac1RWCZkis_Es1ouwk11P27g5NhWzQ/viewform?usp=sf_link',
      'matthew and madison meron': 'https://docs.google.com/forms/d/e/1FAIpQLSc3nlUIb9yvUS43NA8IvyuF4amieeGMTOe3J_DfHo5qA6doBg/viewform?usp=sf_link',
      'the jung family': 'https://docs.google.com/forms/d/e/1FAIpQLSdhTqDDcJHJeI-_mySkcPtNDLBZ7wFpoPki3xFwM3v2ZOgKKw/viewform?usp=sf_link',
      'mrs. susan jung': 'https://docs.google.com/forms/d/e/1FAIpQLSezCBuXwZSuXMhiFb5Ye4whQ59FSSCCIuU3whmatuA64spErQ/viewform?usp=sf_link',
      'the chan family': 'https://docs.google.com/forms/d/e/1FAIpQLSenahGQrnWD_-86rDwOoQ0l5Wpk0rJxG6zGqfz8-TBVb3skdw/viewform?usp=sf_link',
      'mr. peter lam': 'https://docs.google.com/forms/d/e/1FAIpQLSdCo0QLLfXoMCdSDkANSg_Peesi-NcLWjfivZYeCu7qRBBVmA/viewform?usp=sf_link',
      'the eng family': 'https://docs.google.com/forms/d/e/1FAIpQLSdu2YzY-8RfToQo3BXCgrkpkR5hnWoZ1TeRFON734bF2qkaOA/viewform?usp=sf_link',
      'mr. & mrs. ser hwang wong and family': 'https://docs.google.com/forms/d/e/1FAIpQLSdZGFa1G6hev_jjB8MxvU8axjKYE1CfSf0mSblXnRWHIM2uKA/viewform?usp=sf_link',
      'the hearle family': 'https://docs.google.com/forms/d/e/1FAIpQLSe9O0mJcKB3n7C1Ym_xUQlmxERjPB34BSZy8NZHyeV8CNYe0A/viewform?usp=sf_link',
      'uncle victor and auntie trudie tan': 'https://docs.google.com/forms/d/e/1FAIpQLSe9t9WN3twFjTAxm-YB05kuUYYpkQTbjyNrcLiEImvG1KVuUg/viewform?usp=sf_link',
      'the owens family': 'https://docs.google.com/forms/d/e/1FAIpQLSdbJdB-4ZoK2zRlVlN7PEewNSyT3FHJMCcQRjhWVyvhS2z9PA/viewform?usp=sf_link',
      'the hendrix family': 'https://docs.google.com/forms/d/e/1FAIpQLSeqlWdhWYZJBkW0aRkNUZAbbwkPCf9_MQXoM4xB9kWDY7m-zQ/viewform?usp=sf_link',
      'mr. & mrs. john dhillon': 'https://docs.google.com/forms/d/e/1FAIpQLSexvRi6JwdV9ebDh1giNg6XJJ_4f7PKyWxUcl_C_Y82tsjY4g/viewform?usp=sf_link',
      'sean and hannah dhillon and family': 'https://docs.google.com/forms/d/e/1FAIpQLSfJQDGtpKa4kKkYqhhdw7fYFtrPblgKFrsjR5Oqv1NmzXZe7A/viewform?usp=sf_link',
      'jonathan and bekah dhillon and family': 'https://docs.google.com/forms/d/e/1FAIpQLSfUbKW4jO8kbcOAmU7Qx0JyQ8IXvHEYfqhhSsv-Ip7SMmfC-w/viewform?usp=sf_link',
      'mr. & mrs. i.t. wong': 'https://docs.google.com/forms/d/e/1FAIpQLSep5fBL54k-_NQOZ58uy4hAeV9MgP9x22a2cBFKpVOIqIOM4w/viewform?usp=sf_link',
      'mr. & mrs. nick wong and family': 'https://docs.google.com/forms/d/e/1FAIpQLScq6gT_upTQDXIWyFN8g2IsNHKppPGDTPhNGm7jwiVj92_Twg/viewform?usp=sf_link',
      'mr. & mrs. michael monk': 'https://docs.google.com/forms/d/e/1FAIpQLSdY2t1lVEni1SJq-D3F1tM_LEZym1qgTQ78BsIoStNTPmFjgQ/viewform?usp=sf_link',
      'mr. & mrs. philip chiang': 'https://docs.google.com/forms/d/e/1FAIpQLSfvE35WPqKk-VWfs9jh11odM8UHTQuE6-gvybsVebN_CEXa_g/viewform?usp=sf_link',
      'abraham and france chang': 'https://docs.google.com/forms/d/e/1FAIpQLScaMZ2AUc9C-jHqF53SEjE-be8UJb4n3nBCos9iPviP8-1Cmg/viewform?usp=sf_link',
      'kevin and becky miguel': 'https://docs.google.com/forms/d/e/1FAIpQLSeNxYvzFd16Hc1CiggRnU8YZmWpoNCxUdezuQadvJAcRmYQSg/viewform?usp=sf_link',
      'deborah lim': 'https://docs.google.com/forms/d/e/1FAIpQLSelLCFLVrRvRWJC090M7dzkQRcaMMiO4C-jZuxFGeGPPxdfsQ/viewform?usp=sf_link',
      'the li family': 'https://docs.google.com/forms/d/e/1FAIpQLSf7wrotao6ebske_cTIQWww9GC7CRh7UchR9B3RXxCoM_BNVg/viewform?usp=sf_link',
      'mr. & mrs. lei chen': 'https://docs.google.com/forms/d/e/1FAIpQLSdHSIoIUG2qwoMAX-YC1M7M_-2K1XAu3QafgQMjZ_XQ4-GHvw/viewform?usp=sf_link',
      'ms. jie li': 'https://docs.google.com/forms/d/e/1FAIpQLSeWDLrcWS65shawLYptsWzPb36WXFVrikFygv9Xck0NfM7hUw/viewform?usp=sf_link',
      'jordan lin': 'https://docs.google.com/forms/d/e/1FAIpQLSc0-WBmi3V4sQB27DqztEF2kBdfpao7unuhV1941YvLy4_Vng/viewform?usp=sf_link',
      'joon ahn': 'https://docs.google.com/forms/d/e/1FAIpQLSfNSmBD2XGn-oSZ4DXoKFPos9M4ZjTYGgbHtdfJPPnitcwpxA/viewform?usp=sf_link',
      'noah dietz': 'https://docs.google.com/forms/d/e/1FAIpQLScYc33CLQ1FmeI5yGgVIHWv38uWzYOL80t30_3f3GYBNJaiag/viewform?usp=sf_link',
      'kushal byatnal': 'https://docs.google.com/forms/d/e/1FAIpQLSc3BzIFxwMIgqg8XxWMltURdjb1whCBKHoPuAOOt2fa-W1abg/viewform?usp=sf_link',
      'kevin luk': 'https://docs.google.com/forms/d/e/1FAIpQLSe9iMrpLFmoJnTlvO_tkvZXgM8ebmqbi51eqMW6pW7HXkR_Gw/viewform?usp=sf_link',
      'jason weinberg': 'https://docs.google.com/forms/d/e/1FAIpQLSd94gCdXtTBp7EvknOs-6pV8IqWNrTLvUA-B74g2OHzkmlsEA/viewform?usp=sf_link',
      'arvind sontha': 'https://docs.google.com/forms/d/e/1FAIpQLScSg_4pN71DdRuj8SuBIPCXYcspEN5PumE-6HsyiKISD0cUsQ/viewform?usp=sf_link',
      'michael and whitney gomez': 'https://docs.google.com/forms/d/e/1FAIpQLSeWNq8IMwEmpLQObcH48DZg_zAlcFGSpLcM_A03ky0iM6gx-w/viewform?usp=sf_link',
      'phil and jen wong and family': 'https://docs.google.com/forms/d/e/1FAIpQLSf6ljOINQwj72207SzHweVOOptJkDyNM87kCa2sli0oJMnztw/viewform?usp=sf_link',
      'andrew and christy mason': 'https://docs.google.com/forms/d/e/1FAIpQLSd44XznSuYaFYB8TnaBY70Y5VR530VIHWLIxy6n5Aqk_jViyQ/viewform?usp=sf_link',
      'denise zhu': 'https://docs.google.com/forms/d/e/1FAIpQLSdlOGREXih8ci_71tpQr_tbNKcWTO6mApzntzoDTAvqHrMPFw/viewform?usp=sf_link',
      'clare hove': 'https://docs.google.com/forms/d/e/1FAIpQLSf6jCJHxzrVhyJuSW9ANv61gnXJcKVoLLDwH0XFtjI6Thv7Fg/viewform?usp=sf_link',
      'lindsay chiang': 'https://docs.google.com/forms/d/e/1FAIpQLSdsmQnZurxUWZOfeX_j0ZkQhUX5vtNHMRjPuKBlpA00kUqQdA/viewform?usp=sf_link',
      'nicolette battista': 'https://docs.google.com/forms/d/e/1FAIpQLSfKJjs8vKVEcu3T8e9PGw8F2S9oqdrYWPjNdRWacRQtiV1URg/viewform?usp=sf_link',
      'elise and tracie hara': 'https://docs.google.com/forms/d/e/1FAIpQLSc8GKX85lr03C7O3fOweJAlBFbvlK1yBBAfeSpZcSnLRac7xw/viewform?usp=sf_link',
      'ryan najima': 'https://docs.google.com/forms/d/e/1FAIpQLSe50KQbgFdWQDdormzICbgmBsI-fVwzRsnuN662vl9GTpHcGw/viewform?usp=sf_link',
      'kiyoshi lee': 'https://docs.google.com/forms/d/e/1FAIpQLSeczNujLv94yrdtEaSmHj_FoPH12spsH3eLJn5BugXs5GCKaA/viewform?usp=sf_link',
      'connor kobayashi': 'https://docs.google.com/forms/d/e/1FAIpQLScKzF_FJomckaUBXgMXvCD0OkBCfdwIE775GPKmvtQ3Q2Ly9A/viewform?usp=sf_link',
      'kristin oda': 'https://docs.google.com/forms/d/e/1FAIpQLScluS-8SQavMhnNHIVNfRd6n3VAJo4k90erH20oUnKpnBLVKg/viewform?usp=sf_link',
      'jared oda': 'https://docs.google.com/forms/d/e/1FAIpQLSc9IcvEt8JVYzGCZEMBzn3yOjSHqxduJkKiL2vG4cpQWRiunQ/viewform?usp=sf_link',
      'aaron and mimi takigawa': 'https://docs.google.com/forms/d/e/1FAIpQLSe0nKYtZARkMlhHcOUuieZEHQxmmicn8W-HK0zznl5vhApqyA/viewform?usp=sf_link',
      'alex and alyssa chiang': 'https://docs.google.com/forms/d/e/1FAIpQLSf0WMiDoeSUT9cottq2Esg8-iE0Xrwz6ccw-DqYaCtbhEYlrg/viewform?usp=sf_link',
      'koh and yuki shida': 'https://docs.google.com/forms/d/e/1FAIpQLSeOcvxOfmY2cpgq2-KO5mnEI2VFl4FvbxYU8kBgLJuy9uqbYA/viewform?usp=sf_link',
      'tomoko taguchi': 'https://docs.google.com/forms/d/e/1FAIpQLSeTS3N3kqy66TXeI4P-YklLU9EnoF6OwcmOYBd8E4SurbBsRQ/viewform?usp=sf_link',
      'jonathan lin': 'https://docs.google.com/forms/d/e/1FAIpQLSfIdpJ3C_Om9mvs-8CgYAA4ANo_VM3NsJrwvXPPK-E-u2dyGg/viewform?usp=sf_link',
      'brandon chen': 'https://docs.google.com/forms/d/e/1FAIpQLSfD6gDetfCQrnvaCtg1Fkt5SSkXl8BCa10WMlWNfXUZUJVE3Q/viewform?usp=sf_link',
      'shane liao': 'https://docs.google.com/forms/d/e/1FAIpQLSfqGX_PHqGZjFYTMz6VNevWbtNHUt4wFXwDf-eFWCDEdY2-Uw/viewform?usp=sf_link',
      'kent park': 'https://docs.google.com/forms/d/e/1FAIpQLScWeBVKax0qWmUstJtPTrzcHuSihwSQLolOwoM8dZuGN9rzbA/viewform?usp=sf_link',
      'hansen tsai': 'https://docs.google.com/forms/d/e/1FAIpQLSepB0vBWLxKR-MBDZW_VWiHA0gt0MdEiMA5au4GN-NGmjdDJw/viewform?usp=sf_link',
      'phillip tan': 'https://docs.google.com/forms/d/e/1FAIpQLSfdNrcoSzkWO4HqxWla51CjFtlf-TZsqFJNk7gp5TgXPwQZ0Q/viewform?usp=sf_link',
      'tiffany bui': 'https://docs.google.com/forms/d/e/1FAIpQLSfCqEoqnL5OyzxycWueVTCWcYAF3aI2HtSdi4sb5EueeZIjnw/viewform?usp=sf_link',
      'diana lam': 'https://docs.google.com/forms/d/e/1FAIpQLSfAYgp8nWOIpaZIAWKYLpVW1VOMhJTJS0_6Z0dxUnkapolZLg/viewform?usp=sf_link',
      'alexis hui': 'https://docs.google.com/forms/d/e/1FAIpQLSfRZi6uVo8Hq8KfAUSBh-cY7Kc6hZr2zWr9nFEdqBHLfWjMgg/viewform?usp=sf_link',
      'michael wong & melody lin': 'https://docs.google.com/forms/d/e/1FAIpQLSftGvqsWF2hC_74PDL1x7ooxthnDmqCoMWJkhyKBRG4PhUzqQ/viewform?usp=sf_link',
      'timothy chu': 'https://docs.google.com/forms/d/e/1FAIpQLSeFkDtjJitLR09UPYCM-l0QN9dSERmGpZZV1vYZ67HHD8iKpQ/viewform?usp=sf_link',
      'don miguel': 'https://docs.google.com/forms/d/e/1FAIpQLSdEoAA9tNY_Tf1ZuMlXeuIpZme85ALTSpMSsRkMJUe3oPnxjA/viewform?usp=sf_link',
      'albert chen': 'https://docs.google.com/forms/d/e/1FAIpQLSdm4fwNSJivhKtywBuCu3fWTrWh5hswZwM4IjOfaONNHbgmYQ/viewform?usp=sf_link',
      'casey ting': 'https://docs.google.com/forms/d/e/1FAIpQLSchHeINCuYv0ME3u0qlBmaj9a5h_p65x4Kc4yx7zIMIKRQR-w/viewform?usp=sf_link',
      'lena choi': 'https://docs.google.com/forms/d/e/1FAIpQLSft8tIoCQRmcZlxPyB0S3IZ5-DzXzc_vm3s8sWk1fXTe0z4zQ/viewform?usp=sf_link',
      'leo shimizu': 'https://docs.google.com/forms/d/e/1FAIpQLSeWcBKZzfRQvPIMGpQPewxMqhsMCWHwLH0YZAKYWSUGRnU7WQ/viewform?usp=sf_link',
      'david and deanna kao': 'https://docs.google.com/forms/d/e/1FAIpQLSekXXaH2lHV9vtWGfjRdgLXy1hK2XsnTb3VScBq75eYhMMVXg/viewform?usp=sf_link',
      'dr. & mrs. david janzen': 'https://docs.google.com/forms/d/e/1FAIpQLSduWUUiX1XWP2aLT8J130F688QoYLySl6nnA2Kd6Sh7cRh9Yg/viewform?usp=sf_link',
      'the neumanns': 'https://docs.google.com/forms/d/e/1FAIpQLSfnDFRHQbKKrEW7peNaEuX9j-rhwiiUVQHWrCMt-L-PR3Wheg/viewform?usp=sf_link',
      'terry kim': 'https://docs.google.com/forms/d/e/1FAIpQLSeGAHOACyNeapjrblTfX0oY5yIN_45k9PBLVN1O-cKy2bNpBA/viewform?usp=sf_link',
      'bryan sugiarto': 'https://docs.google.com/forms/d/e/1FAIpQLSfdSMvafO5SEFXQayME_DHLzq_rOj_B-t0qD_iomNp44VgZMg/viewform?usp=sf_link',
      'kristen nakasone': 'https://docs.google.com/forms/d/e/1FAIpQLScUePoc6-YEMK8ZWQUlOxNFhvpGMlFSIofiokayAiGcg9cy3A/viewform?usp=sf_link',
      'venise lee': 'https://docs.google.com/forms/d/e/1FAIpQLSfGWHZzOM6d0SzFlewr2NRZASYDWKjEHIXGZARY7XznsubwEA/viewform?usp=sf_link',
      'blane and rachel higa': 'https://docs.google.com/forms/d/e/1FAIpQLSeEY5imRi4Z4f7V0RuF5arrtLZv6dIplssABOsq-jlULDQK-Q/viewform?usp=sf_link',
      'tae and faith hwang': 'https://docs.google.com/forms/d/e/1FAIpQLSdF7Plx5PI4pQWXWauFqPH2pv7xu_3IJeT421ZL_9XSZtPj8w/viewform?usp=sf_link',
      'brian vuong': 'https://docs.google.com/forms/d/e/1FAIpQLSfXV56_HYxJIE9-d9gp-88oFqzzVVg3FtEIG_PYWaqoAW8H6Q/viewform?usp=sf_link',
      'jeanette lee': 'https://docs.google.com/forms/d/e/1FAIpQLScGUb-g5_-NY3oq1NJRtcX3eRS1Ub3tckRr8M4KN1PX3N6dGA/viewform?usp=sf_link',
      'kelly zakimi': 'https://docs.google.com/forms/d/e/1FAIpQLSftmvvdcjmChOjOEAeLDEUOrFad07c6NIXtcj8_c9i5A8Dd3A/viewform?usp=sf_link',
      'andrew and annie hsu': 'https://docs.google.com/forms/d/e/1FAIpQLSfNydaFAY_p7N21Z_Q6rtkawfWlwnvp16Ti1UMQIbhZAx4L1A/viewform?usp=sf_link',
      'uncle roddy and auntie grace kwan': 'https://docs.google.com/forms/d/e/1FAIpQLScgI2DCsDlnDfiU5NCQmtdLNmIu6UHzq22pzTeGfTcJwG2VPA/viewform?usp=sf_link',
      'ben and jamie yeung': 'https://docs.google.com/forms/d/e/1FAIpQLSdGqiXEp-VvvyDk-ZvZs46lBsxUVO15g7YnFGmvvelsarli8A/viewform?usp=sf_link',
      'mr. & mrs. kerman lau': 'https://docs.google.com/forms/d/e/1FAIpQLSdyMgBIzTeV1wRDiZqae07qXgd9Rgm5xtmGfiKKQSlSATS0DA/viewform?usp=sf_link',
      'gregg and theresa morita': 'https://docs.google.com/forms/d/e/1FAIpQLSc8WsOGx0SeiS3PY-GuiWJQ7Nmil8Id4FlAcse0Y0jmxLv6Jg/viewform?usp=sf_link',
      'uncle stewart and auntie joyce cheang': 'https://docs.google.com/forms/d/e/1FAIpQLScBr_ZYeV0E2SAz83bw7ppATH8pJnhdjW-hMiGaOvMugTgiZw/viewform?usp=sf_link',
      'michael cheang': 'https://docs.google.com/forms/d/e/1FAIpQLScQWOlnWkAVKrtiFLSf4FLJzdBY_aJd4-zMRguFvwE53vqW_w/viewform?usp=sf_link',
      'auntie wanda and yvette chun': 'https://docs.google.com/forms/d/e/1FAIpQLSfrU0AgDgXktr468pfFMuj8VHeB4SKQXT9b-Z05vIWd5ClGjw/viewform?usp=sf_link',
      'uncle wayne and auntie pat wong': 'https://docs.google.com/forms/d/e/1FAIpQLScYiNXdna31RMFlsUUwB4tdjjrDdr8Ux5W84bIWWw54eMWT7g/viewform?usp=sf_link',
      'joseph wong': 'https://docs.google.com/forms/d/e/1FAIpQLSd6RXZLGTpTwWKqeS3JGDJTXOldh24B4OwNs66gvMcBV5filg/viewform?usp=sf_link',
      'mr. & mrs. ken liu': 'https://docs.google.com/forms/d/e/1FAIpQLSd7qLLo_Q5DOCm_-ReLRfr8ne9hD5eJh7U3r9PSuiELOCZd0A/viewform?usp=sf_link',
      'auntie peggy lam': 'https://docs.google.com/forms/d/e/1FAIpQLSe1WURNauJJpHU0ffXiHeSGy3jXk_MTE2CzVhA4fxuPoL9weA/viewform?usp=sf_link',
      'uncle ray and auntie maureen jee': 'https://docs.google.com/forms/d/e/1FAIpQLScPPeqNYQ2Bl9pqYm4Y_cbX1WDAPpl4LitSs9nVJ9TzAGmpgg/viewform?usp=sf_link',
      'mr. & mrs. frank wong and family': 'https://docs.google.com/forms/d/e/1FAIpQLScjevNYSMuypZEjFjm0lxxl1JkNXqJChDEJdggrE9bLB4vV9g/viewform?usp=sf_link',
      'mr. & mrs. george wong': 'https://docs.google.com/forms/d/e/1FAIpQLSfIXQfLp4fLhlTsW1-VpoI9fwYQzonB8uSem67lNtdHEVAaiA/viewform?usp=sf_link',
      'mr. & mrs. mark tchao': 'https://docs.google.com/forms/d/e/1FAIpQLSfIA73PHbQ_QN4-oplWCU71ISPdZnIC-_QST1GCla6NPSPrjA/viewform?usp=sf_link',
      'mr. & mrs. mario au': 'https://docs.google.com/forms/d/e/1FAIpQLScepv_FiYDFhiHLcmuncRt9zHJmZ_CSvHeow7qIxFoGUw0IAg/viewform?usp=sf_link',
      'mr. peter cheung': 'https://docs.google.com/forms/d/e/1FAIpQLSdwf8Q7-OFcTWWl5b6lFCX4DF6qkG7hVkgntytxej7a43FEJQ/viewform?usp=sf_link',
      'dr. & mrs. joseph au': 'https://docs.google.com/forms/d/e/1FAIpQLScSNY18WUff4WEvJt5e2eHCuJrUNuhpmYx7NfAt4MuUnjPWSw/viewform?usp=sf_link',
      'auntie selina lau': 'https://docs.google.com/forms/d/e/1FAIpQLSdMgnruhDUwPOtL84lzULJQ_2ilqXQ2vSl1ltRdS2mtXyaw-g/viewform?usp=sf_link',
      'auntie lucille liang': 'https://docs.google.com/forms/d/e/1FAIpQLSfxMCZf5ag_BgNQNyGBKbClKDk54bgCXdPBbr8F8mLlQtWkvA/viewform?usp=sf_link',
      'the kwong family': 'https://docs.google.com/forms/d/e/1FAIpQLSdRhLrnLUxkAZxS3bKO9BZFEjPPv9vDROcu3ynubwlNS5AWUQ/viewform?usp=sf_link',
      'mr. & mrs. choon hwa chua and family': 'https://docs.google.com/forms/d/e/1FAIpQLSeMVGUa6q_khAeZVr8sz43-6YItxKjmQ0drrzeWvOitWaLjjA/viewform?usp=sf_link',
      'mr. & mrs. weixi chua': 'https://docs.google.com/forms/d/e/1FAIpQLSeYsd3HhKkk0F2TqQJGKJWrHjpS7fFnuyS7vzxVTI9bvwWzMQ/viewform?usp=sf_link',
      'mr. & mrs. ramon garcia': 'https://docs.google.com/forms/d/e/1FAIpQLSed3qqAc17wCEEzfQCwDHzu2n737O2xK4QbzKUgUhpFsZPeDA/viewform?usp=sf_link',
      'the szeto family': 'https://docs.google.com/forms/d/e/1FAIpQLSfJq4VrVuJ4pOoodNC0ZMfjdYgWybDibGhC2hmXx9WENIQ77g/viewform?usp=sf_link',
      'michelle fang': 'https://docs.google.com/forms/d/e/1FAIpQLSfz2uCoV0_sm2vms4nvWFwa2Goh6-7qCThJl4Sn5iv-opSS-A/viewform?usp=sf_link',
      'josh tan': 'https://docs.google.com/forms/d/e/1FAIpQLSeK02LZsiJRwgfwfQqmlecctFVT78XQvZDX7vDL3O3n5fRxmQ/viewform?usp=sf_link',
      'katrina aldana': 'https://docs.google.com/forms/d/e/1FAIpQLSfxvV_h2rmsO4TI08m2juOhj_6mQUO3Ou_EEbSde06FB8KEWQ/viewform?usp=sf_link',
      'mr. daniel geng': 'https://docs.google.com/forms/d/e/1FAIpQLScldt4lm8rAtmIAM0EaUXEIUfqN34sNnrgz6Vr8MQ7RcVEMJw/viewform?usp=sf_link',
      'the teh family': 'https://docs.google.com/forms/d/e/1FAIpQLSdDO3TkOR2KCuQjP6LnqUS86kR4nqlqQ5tfeHj5U05t30G9UQ/viewform?usp=sf_link',
      'the yeoh family': 'https://docs.google.com/forms/d/e/1FAIpQLSe42KGSkCSBu-DtFrYgn-IGdhW0jyMjsU05vVdFZ_vKVGwK0w/viewform?usp=sf_link',
      'mr. & mrs. thomas chin': 'https://docs.google.com/forms/d/e/1FAIpQLScDnFB8qVPKTnwHg13rmyXfIJ6xUKvtEF1xqaaAax7QzKuIgg/viewform?usp=sf_link',
      'mr. bee pen chau': 'https://docs.google.com/forms/d/e/1FAIpQLSeidb87qfugTX-UEME_YGUd9csT7M22spbwAadCfvtD4zvVHg/viewform?usp=sf_link',
      'ms. sharon chau': 'https://docs.google.com/forms/d/e/1FAIpQLSfl3WtPMlVktanPT6gaWF_rZuhwVP6nSGPE3zVIumraAYGI2A/viewform?usp=sf_link',
      'mr. & mrs. lee moon wing and family': 'https://docs.google.com/forms/d/e/1FAIpQLSc1_cm4ytTOtUmylmm2EYDOy3rbNNTFukd-LJVY-Ei7GsX7_g/viewform?usp=sf_link',
      'mr. & mrs. ming-te chuang': 'https://docs.google.com/forms/d/e/1FAIpQLSeefMQjVFmzWiD0VSOZMhsNHlUBK_f0T8X7EQJ7LfYTILm37g/viewform?usp=sf_link',
      'mrs. sheng-tzu chuang lin': 'https://docs.google.com/forms/d/e/1FAIpQLScFfYO08ybPYyzWXguun7UKL5FxOLnjYuh3EJ9fGJSs9zwkrg/viewform?usp=sf_link',
      'mr. jung lee': 'https://docs.google.com/forms/d/e/1FAIpQLSffU8pZFhAj0PyaYUtE2vKFH5p1B2CtOswgt7ga95f-ww9VIw/viewform?usp=sf_link',
      'mr. & mrs. charlie cha': 'https://docs.google.com/forms/d/e/1FAIpQLSeKN1HOeALejZLMfqbsl_IGvRlPTsZlGisuWXp4lA1-P71AXA/viewform?usp=sf_link',
      'mr. & mrs. peter chang and family': 'https://docs.google.com/forms/d/e/1FAIpQLSf71zMMkIyByc2o6MjXQCSN5yTvodse3j_4prVq_on_8ArwPw/viewform?usp=sf_link',
      'mr. & mrs. william chang and family': 'https://docs.google.com/forms/d/e/1FAIpQLSffNvG5SqkC8rUBPNzgk3FwFj5ZeEL-KnoViDz6CNi5y-DVaQ/viewform?usp=sf_link',
      'mr. & mrs. jerry lok': 'https://docs.google.com/forms/d/e/1FAIpQLSdvOZ09SaVWiH8uY66Gm9vsjk6sfN-tnjhWSVA6E0BBCw9hzQ/viewform?usp=sf_link',
      'lawrence and mandy mue and family': 'https://docs.google.com/forms/d/e/1FAIpQLSfVPStPLt-AqawNUBBr4NjMqeQQ05qfIUYC9eNAMvoBo50VQA/viewform?usp=sf_link',
      'mr. & mrs. david lok': 'https://docs.google.com/forms/d/e/1FAIpQLScr3jgsW1AGbhscrnfd9A7qluuUgP4NK_-mYHX-VOPu4yL7qw/viewform?usp=sf_link',
      'mr. & mrs. michael shih and family': 'https://docs.google.com/forms/d/e/1FAIpQLSdCC5JooVqFAb4tRcFGzun8POyKss3zZLuBfUfsyH4LxgR1-g/viewform?usp=sf_link',
      'mr. & mrs. david xu and family': 'https://docs.google.com/forms/d/e/1FAIpQLSd6lxJecS3EunQmkF-INdCzXLTQFiM_4bcdiuGH3fGmttkqNg/viewform?usp=sf_link',
      'mr. & mrs. keng teng xu and family': 'https://docs.google.com/forms/d/e/1FAIpQLSfoBd2P1Fq5zGSCLa3tT2Jhb_Msz04fWk_GShZjh1ctcNmC9A/viewform?usp=sf_link',
      'mr. & mrs. philip pan': 'https://docs.google.com/forms/d/e/1FAIpQLSdWDjMZto9xhbyN8WoqurbRtOfbSXyERb-qNsgifKPEeVx9Wg/viewform?usp=sf_link',
      'mr. & mrs. james hsi': 'https://docs.google.com/forms/d/e/1FAIpQLSd2HHTDEhd7Klyubdg5NJtv-uJnVFXKkn6ER0rDsOcOVvZ9Hg/viewform?usp=sf_link',
      'mr. & mrs. julin chen': 'https://docs.google.com/forms/d/e/1FAIpQLSdLhi7Iyy8dx7JcLOs_dSSBIDlcdkn7sOdgexnC5OQ10CI2IA/viewform?usp=sf_link',
      'mr. & mrs. michael chang': 'https://docs.google.com/forms/d/e/1FAIpQLSe0w0BaDCPOUHbDuBsS9BqtFwQbIXrrTGarvjocg_VeqQBmPA/viewform?usp=sf_link',
      'ms. joy kao': 'https://docs.google.com/forms/d/e/1FAIpQLScC_L96GT2kkUPo6W9WdmX_8zmU3TxU2r2JDGMdanqEF-QiYA/viewform?usp=sf_link',
      'mr. & mrs. patrick wu': 'https://docs.google.com/forms/d/e/1FAIpQLScWOqBXW62lm5dQGixW6H6C_h0YZO4gpRrCqJfp5bPf-SMWQg/viewform?usp=sf_link',
      'ms. jenny lee': 'https://docs.google.com/forms/d/e/1FAIpQLSeYJ0tvCsngus0ilg2ND3AHeBz_klCatawd6chhk9cwoER3zA/viewform?usp=sf_link',
      'mr. & mrs. peter liu': 'https://docs.google.com/forms/d/e/1FAIpQLSeEHVC5b0tGu_SWbStbctc5Uo4N4nJrJa91d4mgoizV26pg5Q/viewform?usp=sf_link',
      'mr. & mrs. jack tsai': 'https://docs.google.com/forms/d/e/1FAIpQLSdAqdBTBnROPhc6KTTVljco3DvnTGIFv6YsVRNtGXTpM8onzQ/viewform?usp=sf_link',
      'mr. & mrs. sean chen': 'https://docs.google.com/forms/d/e/1FAIpQLSfghni9qeYho_-ddtFF_jf2KAiqiLhg7MyaBlva4C_5aj2TfQ/viewform?usp=sf_link',
      'mr. & mrs. jay krackeler': 'https://docs.google.com/forms/d/e/1FAIpQLSewTlLPllFMDndkGVJ7Ax3niadgX8i4BrFchdm2hIBpbRC6kg/viewform?usp=sf_link',
      'mr & mrs. david hong and family': 'https://docs.google.com/forms/d/e/1FAIpQLSdY3scmYCcQcsGFMFZgDwrrLZfoMkaavcaphFGSpPBXlu95RA/viewform?usp=sf_link',
      'mr. & mrs. micah chiang': 'https://docs.google.com/forms/d/e/1FAIpQLSeRphS9Re86QQTZOVSY0zurV-MaIDngIhDQmXrtkq7zeJClcQ/viewform?usp=sf_link',
      'mr. & mrs. john lim': 'https://docs.google.com/forms/d/e/1FAIpQLSdMNGr3wtrRFcRzB1aoZptfZ83U6OHHXWeTYDLQKxB8Tj01MQ/viewform?usp=sf_link',
      'ms. jeanie lim': 'https://docs.google.com/forms/d/e/1FAIpQLScPz41rYJYbFSHgnuPiENwiDf0UjZIBAiz5HgIlQeBRhZQZNg/viewform?usp=sf_link',
      'auntie mei ling & dora tay': 'https://docs.google.com/forms/d/e/1FAIpQLSd7engXs3_2gP0dbAFb4eQt_BNAxMHb0PpW8whY9WQVUu1qNw/viewform?usp=sf_link',
      'ms. lily cher': 'https://docs.google.com/forms/d/e/1FAIpQLSd2pWi7YQ_TD1lgZc-WgFaHxHuVm5MsMNPScFKTynf2-_jVcg/viewform?usp=sf_link',
      'uncle kp eng and auntie sock hee': 'https://docs.google.com/forms/d/e/1FAIpQLSdZHNNTBqeKJQglmqYBG0TjVCTTCixkV1lVomwjjBl_UsZsmQ/viewform?usp=sf_link',
      'mr. stephen owen': 'https://docs.google.com/forms/d/e/1FAIpQLSewwRAzSc9jtsem2l5j0crdom4SjPHIN3Pswkeia7LsBl7Dzw/viewform?usp=sf_link',
      'mr. & mrs. tai hsing cha': 'https://docs.google.com/forms/d/e/1FAIpQLScN679qmnJmnM-urGa242whiy1lNnYNh5qN4QiGzMV_WMslZQ/viewform?usp=sf_link',
      'mr. & mrs. kenny chan': 'https://docs.google.com/forms/d/e/1FAIpQLSfvVomhj0ZQ5rwLsuQa91LjJN6ruMAJyw5FuWPHmsAiQFO5fA/viewform?usp=sf_link',
      'mr. & mrs. david chang': 'https://docs.google.com/forms/d/e/1FAIpQLSeRrg2ou2vrcKFGihmH9mWxWKuCJXnepQpY26u0JB1ZfxlhIA/viewform?usp=sf_link',
      'eric & emily chen': 'https://docs.google.com/forms/d/e/1FAIpQLSerchCNwWf3qMtZ5SyGGAjcxQlTdP1oSr6NwRTd00qEouLTjw/viewform?usp=sf_link',
      'ms. grace chen': 'https://docs.google.com/forms/d/e/1FAIpQLSc05Hj1ZotCAEBXdAxmh9qrCVRYl4-yXAuvlIWOaspLnsyl3g/viewform?usp=sf_link',
      'mr. & mrs. guan shi chen': 'https://docs.google.com/forms/d/e/1FAIpQLSf8lFYJ1WgGNHaiWd3rBsIuhRf3_mkb2DOIOc2bNaEqFPs7Tw/viewform?usp=sf_link',
      'eric & huei-ling chen': 'https://docs.google.com/forms/d/e/1FAIpQLSdCNU9PtxDv6zEOQTEt07FOaVWaNuJSYcTRhCb3BrhWegl6sQ/viewform?usp=sf_link',
      'mr. & mrs. ming chen': 'https://docs.google.com/forms/d/e/1FAIpQLScZvE0dj8jb5o21Ez6YU2N5OVNVQNpl-584RAp9hKCn_Egysg/viewform?usp=sf_link',
      'mr. & mrs. paul chen': 'https://docs.google.com/forms/d/e/1FAIpQLSd28iKPvcxzuYBYfhE1LOiQ47Q8Vd93SDu8ilHEeVbyVDe1ag/viewform?usp=sf_link',
      'mr. & mrs. chin yen cheng': 'https://docs.google.com/forms/d/e/1FAIpQLSdQ9zd3VrSf2MHHxQOm1bfReZCBcCYfLbR6ejR_2mHUumpcYA/viewform?usp=sf_link',
      'mr. & mrs. hogan chang and megan chang': 'https://docs.google.com/forms/d/e/1FAIpQLSe7c3nhhbTuR5qjl-NeXDyuG0D3JME5I8wGM2uO-vWShd5OPg/viewform?usp=sf_link',
      'mr. & mrs. len gao': 'https://docs.google.com/forms/d/e/1FAIpQLSfoCmfIQ9eK45aRWFqDJ_hv_NVXHGN-YUhwXcquKxztk8XeiQ/viewform?usp=sf_link',
      'ms. tina han': 'https://docs.google.com/forms/d/e/1FAIpQLSd1ja3e3O62hkB8LfTNDhtPVW1t6Mx7v9_FbmlCDKJa0N6zIg/viewform?usp=sf_link',
      'mr. & mrs. george ho': 'https://docs.google.com/forms/d/e/1FAIpQLSfX-4DqfGO-C8Xjz6RRykS4jSNCM45DIJzF3y4vOyKyf9Wi2g/viewform?usp=sf_link',
      'mr. & mrs. alex hu': 'https://docs.google.com/forms/d/e/1FAIpQLSdh58AplbQ2k28iYlWaIboJjbBaPMSIXdcX7d9uFrMDntJUbQ/viewform?usp=sf_link',
      'ms. tina yu': 'https://docs.google.com/forms/d/e/1FAIpQLScjz80kbdY5iv43329XRhxg8mcVxf7dMIkshFFGayNtyuQlqg/viewform?usp=sf_link',
      'mrs. long shiang hsu': 'https://docs.google.com/forms/d/e/1FAIpQLSdjHzXqqfhop8t1eBJt_PFU0ydNpODJhVnqbtfcoMhTIJZcIg/viewform?usp=sf_link',
      'mr. & mrs. eric hwang': 'https://docs.google.com/forms/d/e/1FAIpQLScK8tUqOHjB9yfhnY30UJQYlJdshd4EveZvZdQ-Hu-5XPIwng/viewform?usp=sf_link',
      'mr. & mrs. steve huang and family': 'https://docs.google.com/forms/d/e/1FAIpQLSemIXqrUWU_x_BWxtmtPIrkbYNfio9EqgrzC5_wGfN37qrBfQ/viewform?usp=sf_link',
      'ms. mui hung and albert zarate': 'https://docs.google.com/forms/d/e/1FAIpQLScIOfPzw4sxtBPu3U1hxbw91ZL1GqlNvCBW18tp9HMzAaSdgQ/viewform?usp=sf_link',
      'mr. & mrs. mario kiang': 'https://docs.google.com/forms/d/e/1FAIpQLSc6VGU-eYNgHG2IECJgRA5zG20c4gBbm2JqFbrMrvkZ1QQHOg/viewform?usp=sf_link',
      'mr. & mrs. greg kwan': 'https://docs.google.com/forms/d/e/1FAIpQLScPPdGrDvTsxztsPXrlE1fN0XqW6bJROra5-wYmyrUhKzGbfQ/viewform?usp=sf_link',
      'ms. tina lai': 'https://docs.google.com/forms/d/e/1FAIpQLSeHpRjxaMpwLaJ6lTSzd5QUkn2z642seHe_-2onc384AZB6VQ/viewform?usp=sf_link',
      'mr. & mrs. tak y. lam and family': 'https://docs.google.com/forms/d/e/1FAIpQLSegoowXA2lui2WiPw8uJ-lkGyic7bRdYmF7TwOzGD_ARzNEOg/viewform?usp=sf_link',
      'ms. janet lee and alvin chen': 'https://docs.google.com/forms/d/e/1FAIpQLSfm-KwrFIauDBEGA4hTm-wC0NnqcuinetA0Ya8Z32xbCuvgig/viewform?usp=sf_link',
      'mr. & mrs. steve liang': 'https://docs.google.com/forms/d/e/1FAIpQLSdb4rjDxnsdQbcd7949leVns_q_VNNWvphVVzaK2zx3zqLXyg/viewform?usp=sf_link',
      'mr. & mrs. erhliu lin': 'https://docs.google.com/forms/d/e/1FAIpQLSe8tWt-h1iiIwPXPYu_BhJgm0ZIaGJvMKA4lQhsT1E8JKtcOQ/viewform?usp=sf_link',
      'mrs. grace liu': 'https://docs.google.com/forms/d/e/1FAIpQLSejDWCuE7nje3JmAJMgKbk5EHUyC09dtSyTX-dzRjyzBAax4Q/viewform?usp=sf_link',
      'mr. & mrs. ray lu': 'https://docs.google.com/forms/d/e/1FAIpQLSeCWgrGuyXqrW1fvq9z95X2l2Bs0I1DNr48cMOXuQHhl9G3JA/viewform?usp=sf_link',
      'mrs. peggy lu': 'https://docs.google.com/forms/d/e/1FAIpQLScsfHpv1ctj6vZNtModAcBpmR6v4T1zsFvN9XEe1iENaukqeQ/viewform?usp=sf_link',
      'mr. & mrs. chris nee': 'https://docs.google.com/forms/d/e/1FAIpQLSe8ljKsRHhEbt2-kZfUFtD2FGA64CxjIpWZvPHDy5yV_7QB-Q/viewform?usp=sf_link',
      'mrs. emmy ng': 'https://docs.google.com/forms/d/e/1FAIpQLSdTswTAepCU3S3VSYG2o6WfVdHE9_EXs9cXWU_CfKq70UGt-A/viewform?usp=sf_link',
      'mr. & mrs. wilson ng': 'https://docs.google.com/forms/d/e/1FAIpQLSf28jzeRc-6lMyBBLlUcoDo4rccYVmHPhsZ6PST-FvpEW_z8g/viewform?usp=sf_link',
      'mr. & mrs. wang guo qin and nathaniel qin': 'https://docs.google.com/forms/d/e/1FAIpQLSfzLtawEA0nQz_L5DoowOL_7VNwbqXBd6Ru_nJytTyxFhi23w/viewform?usp=sf_link',
      'mr. & mrs. james katayama': 'https://docs.google.com/forms/d/e/1FAIpQLScc95FiOvuSH-9B1I07K_Zvqe5SIC6YyMYK7VN1iHVH0RlXqA/viewform?usp=sf_link',
      'mr. & mrs. george tsang': 'https://docs.google.com/forms/d/e/1FAIpQLSeyEpTQr_Ty_jiTfXvgL1WlGZ7QF-M_4l7ABfh4CBByqVpjpA/viewform?usp=sf_link',
      'mr. & mrs. liming sun': 'https://docs.google.com/forms/d/e/1FAIpQLSdtiyckJyigcW-1bjgdENxPFO1flKNJifthHmUriVlvrBVnkA/viewform?usp=sf_link',
      'mr. & mrs. john wu': 'https://docs.google.com/forms/d/e/1FAIpQLScAsFYU4hf5Jf3a1WaS_nV5CHjuAZQJphscuhSvY1Lv3aIYPQ/viewform?usp=sf_link',
      'mr. & mrs. ping-chin yang and iris yang': 'https://docs.google.com/forms/d/e/1FAIpQLScRq9dTsI-K-TefkT5d5SLZ8w0pJEcYa-SnSoz24DYtayJsmQ/viewform?usp=sf_link',
      'mr. & mrs. zhe-ming zhao': 'https://docs.google.com/forms/d/e/1FAIpQLScHBF-iddHoTZGxFJV_mM2DyE1wXEV5JojHjcxwRRTL7yoMRw/viewform?usp=sf_link',
      'mr. & mrs. jason chan': 'https://docs.google.com/forms/d/e/1FAIpQLScP8yasLqckvVR6BmhWTPIP2mhHSdVq5j23C9D18dcv0Uaqvw/viewform?usp=sf_link',
      'mr. & mrs. james goheen': 'https://docs.google.com/forms/d/e/1FAIpQLSfaJwviBhwLyxnTH8iWdMXvUlV8Zd7a1P_2l2wO0lqgl8tSBQ/viewform?usp=sf_link',
      'ms. kai ling hu': 'https://docs.google.com/forms/d/e/1FAIpQLSf8GKhxEkpurKQDqzxX6_SRpH7zGXT5RmATl4cI6irCQtcNiA/viewform?usp=sf_link',
      'will chan': 'https://docs.google.com/forms/d/e/1FAIpQLSfk4XxTHGTwj0JraX5xld3afgZwwjfLdNrLOgn_R3vicBbiIQ/viewform?usp=sf_link',
      'don nguyen': 'https://docs.google.com/forms/d/e/1FAIpQLSdY4AscbUFARTemyJOzFPV5v4Oz94zo-8JTOZ3mfb4hDgQfTA/viewform?usp=sf_link',
      'steven yang': 'https://docs.google.com/forms/d/e/1FAIpQLScwc_713nVL0z2ur7hI0WwJvb0VUpCFtxzosmpyBgfTD0xxjw/viewform?usp=sf_link',
      'esther cheng': 'https://docs.google.com/forms/d/e/1FAIpQLSfnRHGVp6ZPUc-l3GPS8VB6atk6EMZaKpu6eG2tzKOpX8s5QA/viewform?usp=sf_link',
      'joe hsu': 'https://docs.google.com/forms/d/e/1FAIpQLSePucTfN2rgKSLYt7bf1cxC66swNsxB3ZHAiIshwFH8h_wTng/viewform?usp=sf_link',
      'allen ng': 'https://docs.google.com/forms/d/e/1FAIpQLSchO7em9xxsSXU2l6vo0XlAU5aF2zjp88o99Ms9L1YbwIfceQ/viewform?usp=sf_link',
      'mr. & mrs. john hsu': 'https://docs.google.com/forms/d/e/1FAIpQLSeeln5F9gxTlApzK2ca_s7jYRZZh12Q9cHT7bG26Ndkc3vDgg/viewform?usp=sf_link',
      'rachel lu': 'https://docs.google.com/forms/d/e/1FAIpQLSe3B0VXwLtAXaDcOFlBQ5Od657Cr3ujZk-Q2mJbK0XpvkA7Pw/viewform?usp=sf_link',
      'lincy han': 'https://docs.google.com/forms/d/e/1FAIpQLSc69ekydsEoFwkoeG54Lf65mZjo_zffVPjbNeFj6aqHavtfWQ/viewform?usp=sf_link',
      'mr. edward duh': 'https://docs.google.com/forms/d/e/1FAIpQLSe3eOg6V8N6djjF3eI2R85beBd1PflBJ97mkCiqo0nPZgahBg/viewform?usp=sf_link',
      'kosta and mariana yanev': 'https://docs.google.com/forms/d/e/1FAIpQLSfugHgC6GXvG60JJt9lesGg9s7Llk7f_LgY04oWb3lH_cw6sA/viewform?usp=sf_link',
    };

    res.send({
        name: name,
        form: db[name]
    });
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

console.log("Simple static server showing %s listening at http://%s:%s", publicDir, hostname, port);
app.listen(port, hostname);