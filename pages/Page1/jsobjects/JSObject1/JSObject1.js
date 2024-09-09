export default {

	objToRows: (obj=get_scores.data[0]) => {
		return Object.keys(obj).reduce((acc, value) => acc.concat({ 'prop': value, 'value': obj[value]}), [])
	}
	}
