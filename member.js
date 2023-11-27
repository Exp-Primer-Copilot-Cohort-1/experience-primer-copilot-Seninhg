function skillMember(){
    return {
        retrict: 'E',
        templateUrl: 'views/skill-member.html',
        controller: 'skillMemberCtrl',
        controllerAs: 'skillMemberCtrl',
        bindToController: true,
        scope: {
            member: '='
        }
    }
}