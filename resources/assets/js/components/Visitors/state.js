/**
 * Created by Lorilla on 09/08/2017.
 */
function fetch(urlFetch) {

    axios.get(urlFetch).then(response => data.data = _.map(response.data, function (num) {
        var photo_obj = {file: null, id: null};
        var pick = _.pick(num, 'time', 'time_id','id', 'photos','photo', 'name', 'category','gender', 'year', 'category_id', 'schoolId', 'course', 'disabled');
        var object = {
            id: pick.id,
            name: pick.name,
            year: pick.year,
            category: pick.category ? pick.category : '',
            gender: pick.gender ? _.toString(pick.gender.id) : '',
            schoolId: pick.schoolId,
            course: pick.course ? pick.course : '',
            disabled: pick.disabled != 0 ? true : false,
            photos: _.isEmpty(pick.photos) ? '' : pick.photos,
            photo: _.isEmpty(pick.photo) ? photo_obj  : (pick.photo ? pick.photo : photo_obj ),
            time_id: _.isEmpty(pick.time_id) ? null  : pick.time_id,
            time: _.isEmpty(pick.time) ? null  : pick.time
        };
        return object
    }))
}

function findIndex(id) {
    var user = _.findIndex(data.data, {id: id});
    found.user = data.data[user];

}
function findStudent(id) {

    console.log(id)
    var user = _.findIndex(data.data, {schoolId: id});
    return data.data[user]
}


function findId(id) {
    var user = _.findIndex(data.data, {id: id});
    return data.data[user]
}


function dataUpdate(request, message) {
    console.log(request)
    var editData = request;
    var user = _.findIndex(data.data, {id: request.id});


    data.data[user] = request
    axios.patch('/api/visitors/' + editData.id, {
        id: editData.id,
        category_id: editData.category.id,
        name: editData.name,
        schoolId: editData.schoolId,
        year: editData.year,
        course_id: editData.course.id,
        disabled: 0,
        gender_id: editData.gender,
        photo_id: editData.photo.id
    })

        .then(function (response) {
            console.log(response)
            if (response) {
                message
            }
        })
        .catch(function (error) {

        });


}

function disableSelected(request, change) {
    var ID = change == 1 ? request.id : request.visitor_id
    var found = _.findIndex(data.data, {id: ID});

    console.log(request, change)

    data.data[found].disabled = change != 0 ? true : false;

    axios.patch('/api/visitors/' + ID, {
        disabled: change,
        time_id: request.time_id
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

}

function deleteData(dataId) {
    var found = _.find(this.data.data, ['id', dataId]);
    if (typeof found == 'object') {
        var index = _.indexOf(this.data.data, found);
        this.data.data.splice(index, 1)
    }
}

export var found = {
    user: null
};

export var data = {
    data: []
};

export var isEdit = {
    editData: {},
    isToggle: false
};

function isToggle() {
    var vm = isEdit;
    vm.isToggle = !vm.isToggle
}

function setEditData(row) {
    var vm = isEdit
    var found = _.findIndex(data.data, {id: row})
    _.setWith(data.data[found], 'category_id', data.data[found].category.id);
    vm.editData = data.data[found]
}


export  {
    setEditData, isToggle, fetch, findIndex, dataUpdate, deleteData, disableSelected, findId,findStudent
}



