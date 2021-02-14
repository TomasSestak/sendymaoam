const headers = { 'Content-Type': 'application/json' };

const _fetch = async (...args) => {
	const options = {
		headers: headers,
		method: 'POST',
		body: JSON.stringify(args[0]),
	};
	const res = await fetch(process.env.API_URL || process.env.NEXT_PUBLIC_API_URL, options);
	const res_json = await res.json();
	if (res_json.errors) {
		throw JSON.stringify(res_json.errors);
	}
	return res_json.data;
};

export default _fetch;
