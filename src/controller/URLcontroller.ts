import { Request, Response } from "express";
import shortId from "shortid";
import { URLModel } from "src/database/model/URL";
import { config } from "../config/Constants";

export class URLcontroller {
    public async shorten(req: Request, response: Response) : Promise<void> {
        //ver ser a url ja existe
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if(url) {
            response.json(url)
            return
        }
        //Criar a hash pra essa url
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        const newURL = await URLModel.create({ hash, shortURL, originURL })
        response.json(newURL)
        //salvar a url no banco
        //retorna a url que a gente savou
        response.json({ originURL, hash, shortURL })
    }

    public async redirect(req: Request, response: Response): Promise<void> {
        //Pegar hash da url
        const { hash } = req.params
        const url = await URLModel.findOne({ hash })

        if(url) {
            response.redirect(url.originURL)
            return
        }

        response.status(400).json({ error: 'URL not found'})
    }
}