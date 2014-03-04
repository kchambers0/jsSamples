Ext.define('PhillySchools.view.EnrollmentChart', {
    extend: 'Ext.chart.CartesianChart',
	xtype: 'enrollmentchart',
	
	requires:[
		'Ext.chart.series.Bar',
		'Ext.chart.axis.Numeric',
        'Ext.chart.axis.Category'
	],
	
	config:{
		title:"Enrollment",
		store:"SchoolEnrollment",
		colors: [
            '#115fa6',
            '#94ae0a',
            '#a61120'
		],
		style: {
            maxBarWidth: 15,
            lineWidth: 1.5,
            stroke: 'black',
            shadowColor: 'rgba(0,0,0,0.7)',
            shadowBlur: 10,
            shadowOffsetX: 3,
            shadowOffsetY: 3
        },
		animate: {
            duration: 1500,
            easing: 'easeIn'
        },
        series: [{
        	type:"bar",
        	xField:"year",
        	yField:[
        		"enrollment",
        		"new_students",
        		"withdrawn_students"
        	],
        	stacked:false
        }],
        axes:[{
        	type:"numeric",
        	position:"left",
        	grid:{
        		odd:{
        			fill: "#fafafa"
        		}
        	},
        	minimum:0
        },{
        	type:'category',
        	position:"bottom"
        }]
	}
});