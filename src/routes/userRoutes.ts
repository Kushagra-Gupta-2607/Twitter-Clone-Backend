import { Router } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Creating an user
router.post('/', async (req, res) => {
    const { email, name, username } = req.body;

    try{
        const result = await prisma.user.create({
            data: {
                email,
                name,
                username,
                "bio": "I'm new on Twitter"
            }
        });
    
        res.json(result);
    } catch(e) {
        res.status(400).json({ error: 'Username and email should be unique' });
    }
    
})

// Fetching all the users
router.get('/', async (req, res) => {
    const allUser = await prisma.user.findMany();
    res.json(allUser);
})

// Fetching a single user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    res.json(user);
})

// Updating an user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { bio, name, image } = req.body;

    try {
        const result = await prisma.user.update({
            where: { id: Number(id) },
            data: { bio, name, image }
        });
        res.json(result);
    } catch (e) {
        res.send(400).json({ error: `Failed to update the user ${id}` });
    }
})

// Deleting an user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.user.delete({
        where: { id: Number(id) }
    });
    res.sendStatus(200);
})

export default router;
