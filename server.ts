import express from 'express';

const app = express();
const port = 5000;

app.get('/api', (req, res) => {
	res.json({
		data: [
			{
				title: 'Testing 1',
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lacus non dolor imperdiet ornare. Sed ut congue lectus. Vestibulum congue nisl sed leo pulvinar dapibus. Morbi arcu velit, consectetur eget placerat in, suscipit ut est. Duis pharetra, odio vel posuere rhoncus, leo velit tempus diam, eget viverra lectus urna eu massa. Pellentesque fermentum nibh eros, ac rutrum urna congue eu. Curabitur rhoncus, arcu non pharetra vehicula, lorem tortor aliquam risus, vel pharetra massa risus interdum tortor. Integer porta porta sapien a porttitor.',
			},
			{
				title: 'Umbrosa Helicoseus',
				content:
					'Lorem ipsum generosa adum el salivosa heretica Lorem ipsum dolor sit',
			},
			{
				title: 'Umbrosa Helicoseus',
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec lacus non dolor imperdiet ornare. Sed ut congue lectus. Vestibulum congue nisl sed leo pulvinar dapibus. Morbi arcu velit, consectetur eget placerat in, suscipit ut est. Duis pharetra, odio vel posuere rhoncus, leo velit tempus diam, eget viverra lectus urna eu massa.',
			},
			{
				title: 'Umbrosa Helicoseus',
				content:
					'Lorem ipsum generosa adum el salivosa heretica Lorem ipsum dolor sit',
			},
			{
				title: 'Umbrosa Helicoseus',
				content:
					'Lorem ipsum generosa adum el salivosa heretica Lorem ipsum dolor sit',
			},
			{
				title: 'Umbrosa Helicoseus',
				content:
					'Lorem ipsum generosa adum el salivosa heretica Lorem ipsum dolor sit',
			},
		],
	});
});

app.listen(port, () => console.log('Server is running on port ' + port));
