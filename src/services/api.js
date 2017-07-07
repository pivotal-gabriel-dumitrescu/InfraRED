require('whatwg-fetch')

var URL = 'http://localhost:9000'

if (process.env.NODE_ENV === '' || process.env.NODE_ENV === undefined) {
  URL = 'http://localhost:9000'
}

export function GetInstanceGroups () {
  return GetDatabByURL(`${URL}/instance_groups`)
}

export function GetReleases () {
  return GetDatabByURL(`${URL}/releases`)
}

export function GetStemcells () {
  return GetDatabByURL(`${URL}/stemcells`)
}

export function GetUpdate () {
  return GetDatabByURL(`${URL}/update`)
}

export function GetInfo () {
  return GetDatabByURL(`${URL}/info`)
}

export function GetInstances () {
  return GetDatabByURL(`${URL}/instances`)
}

export function GetVms () {
  return GetDatabByURL(`${URL}/vms`)
}

export function GetEvents () {
  return GetDatabByURL(`${URL}/events`)
}

export function GetTasks () {
  return GetDatabByURL(`${URL}/tasks`)
}

function GetDatabByURL (URL) {

  return new Promise(
    (resolve, reject) => {
      var url = URL
      var options = {
        method: 'GET'
      }

      fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw (new Error('Server error encountered'))
          }
          return response.text()
        })
        .then(responseText => {
          var payload = {}
          if (responseText) {
            payload = JSON.parse(responseText)
          }
          resolve(payload)
        })
        .catch(error => {
          reject(error)
        })
    }
  )
}
