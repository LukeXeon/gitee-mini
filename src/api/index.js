import utils from "../utils";
import {clientId, clientSecret} from './appkey'

async function request(method, url, body) {
  return await utils.request(
    method,
    url,
    'json',
    body,
    {
      'Content-Type': 'application/json;charset=UTF-8',
    }
  )
}

export default {
  async login(username, password) {
    const url = `https://gitee.com/oauth/token?grant_type=password&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&scope=${encodeURIComponent('user_info projects pull_requests issues notes keys hook groups gists enterprises')}`;
    const response = await utils.request("POST", url, 'json', null, {
      'content-type': 'application/x-www-form-urlencoded'
    })
    await utils.setValue('access_token', response['access_token']);
    await utils.setValue('refresh_token', response['refresh_token']);
    return response;
  },
  async checkLogin() {
    let refreshToken = await utils.getValue('refresh_token')
    if (refreshToken == null) {
      return false;
    } else {
      try {
        await this.checkUserInfo()
        return true
      } catch (e) {
        try {
          let data = await request(
            "POST",
            `https://gitee.com/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`
          )
          let accessToken = data["access_token"]
          if (accessToken || accessToken === "") {
            return false
          }
          await utils.setValue('access_token', accessToken)
          return true;
        } catch (e2) {
          return false;
        }
      }
    }
  },
  async cancelFollowing(username) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/user/following/${username}?access_token=${accessToken}`
    return await request("DELETE", url)
  },
  async following(username) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/user/following/${username}`
    return await request("PUT", url, {
      "access_token": accessToken
    })
  },
  async getUserInfo(username) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/users/${encodeURIComponent(username)}?access_token=${accessToken}`
    return await request("GET", url)
  },
  async getUserFollowers(username, page, countAtPage) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/users/${username}/followers?access_token=${accessToken}&page=${page}&per_page=${countAtPage}`
    return await request("GET", url)
  },
  async getUserFollowing(username, page, countAtPage) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/users/${username}/following?access_token=${accessToken}&page=${page}&per_page=${countAtPage}`
    return await request("GET", url)
  },
  async star(owner, repo) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/user/starred/${owner}/${repo}?access_token=${accessToken}`
    return await request("PUT", url)
  },
  async getStars(user, page) {
    let u = await this.getUserInfo(user)
    let userId = u['id'];
    const url = `https://gitee.com/api/v3/user/${userId}/stared_projects?page=${page}`
    return await request("GET", url)
  },
  async getWatches(user, page) {
    let u = await this.getUserInfo(user)
    let userId = u['id'];
    const url = `https://gitee.com/api/v3/user/${userId}/watched_projects?page=${page}`
    return await request("GET", url)
  },
  async cancelStar(owner, repo) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/user/starred/${owner}/${repo}?access_token=${accessToken}`
    return await request("DELETE", url)
  },
  async watch(owner, repo) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/user/subscriptions/${owner}/${repo}`
    return await request("PUT", url, {
      "access_token": accessToken,
      'watch_type': 'watching'
    })
  },
  async cancelWatch(owner, repo) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/user/subscriptions/${owner}/${repo}?access_token=${accessToken}`
    return await request("DELETE", url)
  },
  async getEvents(username, page, countAtPage) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/users/${username}/received_events?access_token=${accessToken}&page=${page}&per_page=${countAtPage}`
    return await request("GET", url)
  },
  async getMyRepos(page, countAtPage) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/user/repos?access_token=${accessToken}&visibility=all&sort=full_name&direction=asc&page=${page}&per_page=${countAtPage}`
    return await request("GET", url)
  },
  async getOtherRepos(username, page, countAtPage) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/users/${username}/repos?access_token=${accessToken}&type=all&sort=full_name&page=${page}&per_page=${countAtPage}`
    return await request("GET", url)
  },
  async searchRepos(text, lang, page, countAtPage) {
    let accessToken = await utils.getValue('access_token')
    let url = `https://gitee.com/api/v5/search/repositories?access_token=${accessToken}&q=${encodeURIComponent(text)}&page=${page}&per_page=${countAtPage}&order=desc`
    if (lang != null && lang.length > 0) {
      url += `&language=${encodeURIComponent(lang)}`
    }
    return await request("GET", url)
  },
  async searchUser(text, page, countAtPage) {
    let accessToken = await utils.getValue('access_token');
    let url = `https://gitee.com/api/v5/search/users?access_token=${accessToken}&q=${encodeURIComponent(text)}&page=${page}&per_page=${countAtPage}&order=desc`
    return await request("GET", url)
  },
  async checkUserInfo(useCache = false) {
    if (useCache) {
      const userInfo = await utils.getValue('userInfo');
      if (userInfo) {
        return userInfo;
      }
    }
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/user?access_token=${accessToken}`
    let data = await request("GET", url)
    let login = data['login']
    const userInfo = await this.getUserInfo(login)
    await utils.setValue('userInfo', userInfo);
    return userInfo
  },
  async getLatest(page = 1) {
    const url = `https://gitee.com/api/v3/projects/latest?page=${page}`
    return await request("GET", url)
  },
  async getFeatured(page = 1) {
    const url = `https://gitee.com/api/v3/projects/featured?page=${page}`
    return await request("GET", url)
  },
  async getPopular(page = 1) {
    const url = `https://gitee.com/api/v3/projects/popular?page=${page}`
    return await request("GET", url)
  },
  async getLanguageProject(langId, page) {
    const url = `https://gitee.com/api/v3/projects/languages/${langId}?page=${page}`
    return await request("GET", url)
  },
  async getRepos(user, repos) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/repos/${user}/${repos}?access_token=${accessToken}`
    return await request("GET", url)
  },
  async getReadme(user, repos, branch) {
    let data = await this.getTree(user, repos, branch)
    let tree = data['tree']
    let readme = 'README.md'.toLowerCase()
    for (let i = 0; i < tree.length; i++) {
      let item = tree[i]
      if (item['path'].toLowerCase() === readme) {
        return await this.getBlob(user, repos, item.sha)
      }
    }
    throw new Error('no found')
  },

  async getPulls(user, repos) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/repos/${user}/${repos}/pulls?access_token=${accessToken}&state=open&sort=created&direction=desc`
    return await request("GET", url)
  },
  async getBranches(user, repos) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/repos/${user}/${repos}/branches?access_token=${accessToken}`
    return await request("GET", url)
  },
  async getWebPage(user, repos, branch) {
    const url = `https://gitee.com/${user}/${repos}/tree/${branch}`
    return await utils.fetch("GET", url, {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    })
  },
  async getTree(user, repos, tree) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/repos/${user}/${repos}/git/trees/${tree}?access_token=${accessToken}`
    return await request("GET", url)
  },
  async getBlob(user, repos, blob) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/repos/${user}/${repos}/git/blobs/${blob}?access_token=${accessToken}`
    return await request("GET", url)
  },
  async getOrg(org) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/orgs/${org}?access_token=${accessToken}`
    return await request("GET", url)
  },
  getReposType(item) {
    try {
      if ((item['namespace']['enterprise_id'] && item['namespace']['enterprise_id'] !== 0) || item['namespace']['type'] === 'enterprise') {
        return 'enterprise'
      } else if ((item['namespace']['path'] === item['owner']['username']) || item['namespace']['type'] === 'personal') {
        return 'personal'
      } else {
        return 'group'
      }
    } catch (e) {
      utils.debug(JSON.stringify(item))
    }
  },
  async checkFollow(user) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/user/following/${user}?access_token=${accessToken}`
    try {
      await request('GET', url)
      return true
    } catch (e) {
      return false
    }
  },
  async saveIssues(user, repos, title, body, type) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/repos/${user}/issues`
    let text = JSON.stringify({
      access_token: accessToken,
      repo: repos,
      title: title,
      body: body,
      issue_type: type,
    })
    return await request('POST', url)
  },
  async getIssues(user, repos, page, countAtPage, state = 'open') {
    let accessToken = await utils.getValue('access_token')
    try {
      const url = `https://gitee.com/api/v5/repos/${user}/${repos}/issues?access_token=${accessToken}&state=${state}&sort=created&direction=desc&page=${page}&per_page=${countAtPage}`
      return await request('GET', url)
    } catch (e) {
      const url = `https://gitee.com/api/v5/repos/${user}/${repos}/issues?state=${state}&sort=created&direction=desc&page=${page}&per_page=${countAtPage}`
      return await request('GET', url)
    }
  },
  async getPullRequests(user, repos, page = 1, countAtPage = 100, state = 'open') {
    let accessToken = await utils.getValue('access_token')
    try {
      const url = `https://gitee.com/api/v5/repos/${user}/${repos}/pulls?access_token=${accessToken}&state=${state}&sort=created&direction=desc&page=${page}&per_page=${countAtPage}`
      return await request('GET', url)
    } catch (e) {
      const url = `https://gitee.com/api/v5/repos/${user}/${repos}/pulls?state=${state}&sort=created&direction=desc&page=${page}&per_page=${countAtPage}`
      return await request('GET', url)
    }
  },
  async updateUser(body) {
    let accessToken = await utils.getValue('access_token')
    let b = JSON.stringify({...body, ...{'access_token': accessToken}})
    const url = 'https://gitee.com/api/v5/user'
    return await request('PATCH', url, b)
  },
  async fork(user, repos) {
    let accessToken = await utils.getValue('access_token')
    let url = `https://gitee.com/api/v5/repos/${user}/${repos}/forks`
    return await request("POST", url, {
      'access_token': accessToken
    })
  },
  async getCommits(user, repos, branch, page, countAtPage) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/repos/${user}/${repos}/commits?access_token=${accessToken}&sha=${branch}&page=${page}&per_page=${countAtPage}`
    return await request('GET', url)
  },
  async getOrgUsers(org, page, countAtPage) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/orgs/${org}/members?access_token=${accessToken}&page=${page}&per_page=${countAtPage}&role=all`
    return await request('GET', url)
  },
  async getOrgRepos(org, page, countAtPage) {
    let accessToken = await utils.getValue('access_token')
    const url = `https://gitee.com/api/v5/orgs/${org}/repos?access_token=${accessToken}&type=all&page=${page}&per_page=${countAtPage}`
    return await request("GET", url)
  },
}
