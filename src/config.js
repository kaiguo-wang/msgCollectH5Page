export default {
	// local_ip: 'http://localhost:3000',
	ipH5: 'https://sfkc.sf-express.com',
	ip: '/microservice',
	// no_encry_ip: location.origin,
	no_encry_ip: window.location.origin, // 微伙伴宠宝线上
	// no_encry_ip: 'http://10.0.126.33:8080', // 微伙伴宠宝本地
	// no_encry_ip: location.origin,
	isDecode: true,
	timeout: 10000,
	imgHost: `${window.location.origin}/aircap/wxopen/viewPic.shtml?fileName=` // 线上
	// imgHost: 'http://10.0.126.91:8081/scc-web/aircap/download/downloadImportTemplate.shtml?fileName=' // 测试
};