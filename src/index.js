const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const tag_name = core.getInput('tag_name', { required: true });
    const token = core.getInput('token', { required: true });
    const octokit = github.getOctokit(token);

    const { repo } = github.context;
    const releases = await octokit.rest.repos.listReleases({
      owner: repo.owner,
      repo: repo.repo,
    });

    const release = releases.data.find(
      (release) => release.tag_name === tag_name,
    );
    if (release) {
      if (release.draft) {
        await octokit.rest.repos.updateRelease({
          owner: repo.owner,
          repo: repo.repo,
          release_id: release.id,
          draft: false,
        });
        console.log(`Published release: ${tag_name}, name: ${release.name}`);
      } else {
        core.setFailed(`The release ${tag_name} has already been published.`);
      }
    } else {
      core.setFailed(`No release found for ${tag_name}`);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
