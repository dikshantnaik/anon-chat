var user = [];
var organizations = [];

function createOrganization(id, username, password) {
    organization = { id, username, password };
    organizations.push(organization);
    return organization;
}

module.exports = { createOrganization };